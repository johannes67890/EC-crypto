import BN from "bn.js";
import { utils } from "hash.js";
import { curveOpt } from "./curvesDefined";
import { randomBytes } from "crypto";

export interface Key {
  x: string;
  y: string;
}

class Keys {
  public Gx: BN;
  public Gy: BN;
  public p: BN;

  constructor(curve: curveOpt) {
    this.Gx = new BN(curve.g.x, "hex");
    this.Gy = new BN(curve.g.y, "hex");
    this.p = new BN(curve.p, "hex");
  }

  /**
   * generate random 'size' or 32 byte size private Key
   */
  public generatePrivateKey(size: number | undefined): Key {
    let PRIVATE_KEY;
    if (new BN(size).isEven()) {
      PRIVATE_KEY = {
        x: utils.toHex(randomBytes(size / 2)),
        y: utils.toHex(randomBytes(size / 2)),
      };
    } else if (size == undefined) {
      PRIVATE_KEY = {
        x: utils.toHex(randomBytes(32 / 2)),
        y: utils.toHex(randomBytes(32 / 2)),
      };
    } else throw new Error("Invalid key Size on Private key");
    return PRIVATE_KEY;
  }

  public generatePublicKey(privateKey: Key): Key {
    /**
     * TODO: this might be wrong
     * Dubble check
     */
    const PriavteX = new BN(privateKey.x, "hex");
    const PriavteY = new BN(privateKey.y, "hex");

    const pubX = PriavteX.mul(this.Gx).mod(this.p);
    const pubY = PriavteY.mul(this.Gy).mod(this.p);

    console.log(pubX.byteLength() + pubY.byteLength());

    return { x: pubX.toString("hex"), y: pubY.toString("hex") };
  }
}
