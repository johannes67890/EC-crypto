import BN from "bn.js";
import { randomBytes } from "crypto";
import { Point } from "./index";
import { EDDSA } from ".";
import { hashMsgSHA256 } from "../../util";

interface signature {
  r: BN;
  s: BN;
}

class Signature extends EDDSA {
  /**
   * Selects a random int `k` in interval `[1,n-1]`.\
   * if `k` is `0`, generate new `k`.\
   * \
   * Compute inverse modulo of point `r`\
   * (where `r` y-cordinat is ignored: `r = x1`)
   * \
   *
   * @param hashedMsg Hashed message to be signend
   * @param privateKey Private key used to sign message
   * @returns Digital signature `Point`.
   */
  public sign(hashedMsg: string, privateKey: Point): signature {
    //Method used: https://learnmeabitcoin.com/technical/ecdsa#elliptic-curves
    // generate random k in interval [1,n-1] where n is order of curve
    let k: BN;
    do {
      k = new BN(randomBytes(32), "hex");
    } while (k.eqn(0));

    // r = (x1, y1) = kG
    const r = this.mulMod(k, this.Gx);
    // s = (x2, y2) = k^-1 * (h + d * r) mod n
    const s = k
      .invm(this.n)
      .mul(new BN(hashedMsg, "hex").add(r.mul(privateKey.x)))
      .mod(this.n);
    return { r, s };
  }

  public signMsg(message: string, privateKey: Point): signature {
    const hashedMsg = hashMsgSHA256(message);
    return this.sign(hashedMsg, privateKey);
  }

  public verify(
    hashedMsg: string,
    signature: signature,
    publicKey: Point
  ): boolean {
    //Method used: https://learnmeabitcoin.com/technical/ecdsa#elliptic-curves
    const sInv = signature.s.invm(this.n);
    const u1 = new BN(hashedMsg, "hex").mul(sInv).mod(this.n);
    const u2 = signature.r.mul(sInv).mod(this.n);
    const r = u1.mul(this.Gx).add(u2.mul(publicKey.x)).mod(this.n);
    return r.eq(signature.r);
  }

  public verifyMsg(
    message: string,
    signature: signature,
    publicKey: Point
  ): boolean {
    const hashedMsg = hashMsgSHA256(message);
    return this.verify(hashedMsg, signature, publicKey);
  }
}
