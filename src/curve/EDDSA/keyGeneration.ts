import BN from "bn.js";
import { randomBytes } from "crypto";
import { Point } from "./index";
import { EDDSA } from ".";

/**
 *
 */
class KeySet extends EDDSA {
  /**
   * Generate random `size` or 32 byte size private Key\
   *
   * @param size int of (Pref. even )
   *
   *
   * @returns typeof `Key`
   */
  public generatePrivateKey(size: number): Point {
    let PRIVATE_KEY: Point;
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

    return PRIVATE_KEY != undefined
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
  public generatePublicKey(privateKey: Point): Point {
    /**
     * TODO: this might be wrong
     * Dubble check
     */
    const pubX = privateKey.x.mul(this.Gx).mod(this.p);
    const pubY = privateKey.y.mul(this.Gy).mod(this.p);

    return { x: pubX, y: pubY };
  }
}
export default KeySet;
