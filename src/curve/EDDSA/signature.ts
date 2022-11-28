import BN from "bn.js";
import { randomBytes } from "crypto";
import { Point } from "./EC";
import { EDDSA } from "./EC";
import { hashMsgSHA256 } from "../../util";

export interface signature {
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
   *  computes `s` = (k^-1 * (h + r * d)) % n
   *
   * @param hashedMsg Hashed message to be signend
   * @param privateKey Private key used to sign message
   * @returns Digital signature `Point`.
   */
  private sign(hashedMsg: string, privateKey: Point): signature {
    //Method used: https://learnmeabitcoin.com/technical/ecdsa#elliptic-curves
    // generate random k (nonce) in interval [1,n-1] where n is order of curve
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
  /**
   * Hashes message with SHA256 and signs it.
   * @param message hashed message
   * @param privateKey private key
   * @returns Point of signature
   */
  public signMsg(message: string, privateKey: Point): signature {
    const hashedMsg = hashMsgSHA256(message);
    console.log("Sign hashedMsg: ", hashedMsg);

    return this.sign(hashedMsg, privateKey);
  }
  /**
   * Verifies digital signature.\
   * \
   * Computes Inverse signature `s` -> `sInv` = `s^-1` mod `n`\
   * Computes `u1` = `Msg * sInv` mod `n`\
   * Computes `u2` = `r * sInv` mod `n`\
   * Computes `r` = `u1 * Gx + u2 * Qx` mod `n`\
   * \
   * If `r` == `signature.r` return `true` else `false`
   * @param hashedMsg Hashed message to be verified
   * @param signature signature of message
   * @param publicKey public key of signer
   * @returns boolean; true if signature is valid
   */
  private verify(
    hashedMsg: string,
    signature: signature,
    publicKey: Point
  ): boolean {
    
    const sInv = signature.s.invm(this.n);
    const u1 = new BN(hashedMsg, "hex").mul(sInv).mod(this.n);
    const u2 = signature.r.mul(sInv).mod(this.n);
    const r = u1.mul(this.Gx).add(u2.mul(publicKey.x)).mod(this.n); // TODO: Check if it is correct (Gx?)
    return r.eq(signature.r);
  }
  /**
   * Hashes message with SHA256 and verifies it.
   * @param message message to be verified
   * @param signature signature of message
   * @param publicKey public key of signer
   * @returns boolean; true if signature is valid
   */
  public verifyMsg(
    message: string,
    signature: signature,
    publicKey: Point
  ): boolean {
    const hashedMsg = hashMsgSHA256(message);
    console.log("Verify hashedMsg: ", hashedMsg);
    
    return this.verify(hashedMsg, signature, publicKey);
  }
}
export default Signature;