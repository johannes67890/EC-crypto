import BN from "bn.js";
import { curveOpt } from "../curvesDefined";

export interface Point {
  x: BN;
  y: BN;
}

export class EDDSA {
  public Gx: BN;
  public Gy: BN;
  public p: BN;
  public n: BN;
  public a: BN;
  public b: BN;
  public hash: Sha224Constructor | Sha256Constructor | Sha512Constructor;

  constructor(curve: curveOpt) {
    if (!(this instanceof EDDSA)) {
      return new EDDSA(curve);
    }

    this.Gx = new BN(curve.g.x, "hex");
    this.Gy = new BN(curve.g.y, "hex");
    this.p = new BN(curve.p, "hex");
    this.n = new BN(curve.n, "hex");
    this.a = new BN(curve.a, "hex");
    this.b = new BN(curve.b, "hex");
    this.hash = curve.hash;
  }
  /**
   *
   * @param point Point of ec of type `Point`
   */
  // TODO:
  public isOnCurve(point: Point): boolean {
    const x = point.x;
    const y = point.y;

    if (this.isInfinity(point)) {
      return false;
    }
    const lhs = this.mulMod(x, y);
    const rhs = this.addMod(
      this.addMod(this.expMod(x, new BN(3)), this.mulMod(this.a, x)),
      this.b
    );

    if (lhs.toNumber() == 0 && rhs.toNumber() == 0) {
      return true;
    } else return false;
  }

  /**
   * isInfinity checks if `point` is `Infinity` (represented as `0`) on Elliptic Curve (ec).
   * @params Point on ec of type `Point`
   * @returns Boolean
   */
  public isInfinity(point: Point): Boolean {
    return point.x.isZero() && point.y.isZero() ? true : false;
  }

  /**
   * addMod computes z = (x + y) % p.
   */
  private addMod(x: BN, y: BN): BN {
    let z: BN = x.add(y);
    z.mod(this.p);
    return z;
  }
  /**
   * addMod computes z = (x - y) % p.
   */
  private subMod(x: BN, y: BN): BN {
    let z: BN = x.sub(y);
    z.mod(this.p);
    return z;
  }
  /**
   * mulMod computes z = (x * y) % p.
   */
  private mulMod(x: BN, y: BN): BN {
    let z = new BN(0);
    z = x.mul(y).mod(this.p);
    return z;
  }
  /**
   * mulMod computes z = (x^^y) % p.
   */
  private expMod(x: BN, y: BN) {
    let z = new BN(0);
    z = x.pow(y).mod(this.p);
    return z;
  }
}
