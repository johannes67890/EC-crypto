import BN from "bn.js";
import { randomBytes } from "crypto";
import { Point } from "./index";
import { EDDSA } from ".";
import { curveOpt } from "../curvesDefined";

/**
 *
 */
class KeySet extends EDDSA {
  public publicKey: Point;
  public privateKey: Point;

  constructor(curve: curveOpt) {
    super(curve);
    const PRIVATE_KEY = this.generatePrivateKey(32);
    this.privateKey = PRIVATE_KEY;
    this.publicKey = this.generatePublicKey(PRIVATE_KEY);
  }

  /**
   * Generate random `size` or 32 byte size private Key\
   *
   * @param size int of (Pref. even number)
   * @returns typeof `Key`
   */
  public generatePrivateKey(size: number): Point {
    let PRIVATE_KEY: Point;
    if (new BN(size).isEven()) {
      PRIVATE_KEY = {
        x: new BN(randomBytes(size / 2), "hex"),
        y: new BN(randomBytes(size / 2), "hex"),
      };
    } else throw new Error("Invalid key size on Private key");

    return PRIVATE_KEY !== undefined
      ? PRIVATE_KEY
      : (function () {
          throw "Private key returned 'undefinied'";
        })();
  }
  /**
   * Generates public key (`Q`) from @param privateKey (`d`) and curve generator point (`G`).\
   * Formular: `Q=dG`
   * @param privateKey of type `Key`
   * @returns typeof `Key`
   */
  public generatePublicKey(privateKey: Point, outputType?: string): Point {
    /**
     * TODO: this might be wrong
     * Dubble check
     */
    const pubX = this.mulMod(privateKey.x, this.Gx);
    const pubY = this.mulMod(privateKey.y, this.Gy);

    // TODO:
    // if (outputType == "hex") {
    //   return { x: pubX.toString("hex"), y: pubY.toString("hex") };
    // }

    return { x: pubX, y: pubY };
  }
}
export default KeySet;
