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
    //const rhs = this.addMod(,y)

    return false; //TODO: TEMP!
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

  private mulMod(x: BN, y: BN): BN {
    let num: BN = x;
    let z: BN = new BN(0);

    for (let i = 0; i < y.bitLength(); i++) {
      /* TODO: find solution to Bit() function
           if y.Bit(i) == 1 {
            z = addMod(z, n, p)
          }
          n = addMod(n, n, p)
       */
    }
    return z;
  }

  private expMod(x: BN, y: BN) {
    return x.pow(y).mod(this.p);
  }
}
