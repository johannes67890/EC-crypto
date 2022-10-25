import BN from "bn.js";
import { curveOpt } from "../curvesDefined";

export class EDDSA {
  public Gx: BN;
  public Gy: BN;
  public p: BN;
  public n: BN;
  public hash: Sha224Constructor | Sha256Constructor | Sha512Constructor;

  constructor(curve: curveOpt) {
    if (!(this instanceof EDDSA)) {
      return new EDDSA(curve);
    }

    this.Gx = new BN(curve.g.x, "hex");
    this.Gy = new BN(curve.g.y, "hex");
    this.p = new BN(curve.p, "hex");
    this.n = new BN(curve.n, "hex");
    this.hash = curve.hash;
  }
}
