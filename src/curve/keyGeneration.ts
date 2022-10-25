import BN from "bn.js";
import { curveOpt } from "./curvesDefined";
import { Buffer } from "buffer";
import { getRandomInt } from "../util";
import { randomBytes } from "crypto";

export interface Point {
  x: BN;
  y: BN;
}

/**
 *
 */
class KeySet {
  public Gx: BN;
  public Gy: BN;
  public p: BN;
  public n: BN;

  constructor(curve: curveOpt) {
    this.Gx = new BN(curve.g.x, "hex");
    this.Gy = new BN(curve.g.y, "hex");
    this.p = new BN(curve.p, "hex");
    this.n = new BN(curve.n, "hex");
  }

  /**
   * Generate random `size` or 32 byte size private Key\
   *
   * @param size int of (Pref. even )
   *
   *
   * @returns typeof `Key`
   */
  public generatePrivateKey(size: number): Point {
    let PRIVATE_KEY: Point = {
      x: undefined,
      y: undefined,
    };
    if (new BN(size).isEven()) {
      PRIVATE_KEY = {
        x: new BN(randomBytes(size / 2), "hex"),
        y: new BN(randomBytes(size / 2), "hex"),
      };
    } else if (size === undefined) {
      PRIVATE_KEY = {
        x: new BN(randomBytes(32 / 2), "hex"),
        y: new BN(randomBytes(32 / 2), "hex"),
      };
    } else throw new Error("Invalid key size on Private key");
    return PRIVATE_KEY;
  }
  /**
   * Generates public key (`Q`) from @param privateKey (`d`) and curve generator point (`G`).\
   * Formular: `Q=dG`
   * @param privateKey of type `Key`
   * @returns typeof `Key`
   */
  public generatePublicKey(privateKey: Point): Point {
    /**
     * TODO: this might be wrong
     * Dubble check
     */
    const pubX = privateKey.x.mul(this.Gx).mod(this.p);
    const pubY = privateKey.y.mul(this.Gy).mod(this.p);

    return { x: pubX, y: pubY };
  }
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
  public sign(hashedMsg: string, privateKey: Point): Point {
    //Method used: https://learnmeabitcoin.com/technical/ecdsa#elliptic-curves
    let k = new BN(randomBytes(this.n.byteLength()), "hex");
    while (k.isZero()) {
      k = new BN(randomBytes(this.n.byteLength()), "hex");
    }
    const r = k.mul(this.Gx);
    //const s: BN// = k.invm(hashedMsg+privateKey.x.mul(r)).mod(this.n)
    return { x: r, y: new BN(undefined) };
  }
}
export default KeySet;
