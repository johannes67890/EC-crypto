import BN from "bn.js";
import { curveOpt } from "../curvesDefined";
import { randomBytes } from "crypto";
import { Point } from "./index";
import { EDDSA } from ".";

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
    let k = new BN(randomBytes(this.n.byteLength()), "hex");
    while (k.isZero()) {
      k = new BN(randomBytes(this.n.byteLength()), "hex");
    }
    const r = k.mul(this.Gx);
    //const s: BN// = k.invm(hashedMsg+privateKey.x.mul(r)).mod(this.n)
    return { r: r, s: new BN("") };
  }
}
