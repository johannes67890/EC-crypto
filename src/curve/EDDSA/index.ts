import BN from "bn.js";
import { curveOpt } from "../curvesDefined";

// TODO: make new type?
// export interface Point<T> {
//   x: BN | T;
//   y: BN | T;
// }

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
    const x: BN = point.x;
    const y: BN = point.y;

    if (this.isInfinity(point)) {
      return false;
    }

    const lhs = this.mulMod(x, y);
    /* y**2 = x**3 + a*x + b  % p */
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
    return point.x.isZero() ||
      (point.x.toNumber() == Infinity && point.y.isZero()) ||
      point.y.toNumber() == Infinity
      ? true
      : false;
  }

  // TODO:
  // public isPoint = (x: any): x is Point<any> => {
  //   return true;
  // };

  /*
   * addMod computes z = (x + y) % p.
   */
  public addMod(x: BN, y: BN): BN {
    let z: BN = x.add(y);
    z.mod(this.p);
    return z;
  }
  /**
   * addMod computes z = (x - y) % p.
   */
  public subMod(x: BN, y: BN): BN {
    let z: BN = x.sub(y);
    z.mod(this.p);
    return z;
  }
  /**
   * mulMod computes z = (x * y) % p.
   */
  public mulMod(x: BN, y: BN): BN {
    let z = new BN(0);
    z = x.mul(y).mod(this.p);
    return z;
  }
  /**
   * mulMod computes z = (x^^y) % p.
   */
  public expMod(x: BN, y: BN) {
    let z = new BN(0);
    z = x.pow(y).mod(this.p);
    return z;
  }
}
