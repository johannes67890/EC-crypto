import BN from "bn.js";
import { uint256 } from "../../util";
import { curveOpt } from "../curvesDefined";

export interface Point {
  x: BN;
  y: BN;
}

export class EDDSA {
  public name: string;
  public G: BN;
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
    this.name = curve.name;
    this.G = new BN(curve.G, "hex");
    this.Gx = new BN(curve.g.x, "hex");
    this.Gy = new BN(curve.g.y, "hex");
    this.p = new BN(curve.p, "hex");
    this.n = new BN(curve.n, "hex");
    this.a = new BN(curve.a, "hex");
    this.b = new BN(curve.b, "hex");
    this.hash = curve.hash;
  }
  /**
   * Check if point is on elliptic curve.
   * @param point Point of the ec of type `Point`
   * @returns Boolean
   */
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

    if (lhs.cmp(rhs) === 0) {
      return true;
    } else return false;
  }

  /**
   * pointAdd computes the sum of two points on the elliptic curve.
   * @param point1 Point of the ec of type `Point`
   * @param point2 Point of the ec of type `Point`
   * @returns Point of the ec of type `Point`
   */
  public pointAdd(point1: Point, point2: Point): Point {
    // pointAdd computes the sum of two points on the elliptic curve.
    const red = BN.mont(this.p);
    const x1: BN = point1.x
    const y1: BN = point1.y
    const x2: BN = point2.x
    const y2: BN  = point2.y

    if (this.isInfinity(point1)) {
      return point2;
    }
    if (this.isInfinity(point2)) {
      return point1;
    }

    if (x1.cmp(x2) === 0 && y1.cmp(y2) === 0) {
      return this.pointDouble(point1);
    }

    if (x1.cmp(x2) === 0 && y1.cmp(y2.neg()) === 0) {
      return { x: new BN(0), y: new BN(0) };
    }

    // computes s = (y2 - y1) / (x2 - x1)
    const s = y2.toRed(red).redSub(y1.toRed(red)).redMul(x2.toRed(red).redSub(x1.toRed(red)).redInvm());
    // computes x3 = s**2 - x1 - x2
    const x3 = s.redSqr().redSub(x1.toRed(red)).redSub(x2.toRed(red));
    // computes y3 = s * (x1 - x3) - y1
    const y3 = s.redMul(x1.toRed(red).redSub(x3)).redSub(y1.toRed(red));

    return { x: x3.fromRed(), y: y3.fromRed() };
  }

  /**
   * pointdouble
   * @param point Point of the ec of type `Point`
   * @returns Point of the ec of type `Point`
   */
  public pointDouble(point: Point): Point {
    const x: BN = point.x;
    const y: BN = point.y;

    if (this.isInfinity(point)) {
      return point;
    }

    const s = this.mulMod(
      this.addMod(new BN(3), this.mulMod(this.expMod(x, new BN(2)), this.a)),
      this.expMod(this.addMod(y, y), this.p.sub(new BN(2)))
    );

    const x3 = this.subMod(this.mulMod(s, s), this.addMod(x, x));
    const y3 = this.subMod(this.mulMod(s, this.subMod(x, x3)), y);

    return { x: x3, y: y3 };
  }

  public pointMul(k: BN, point: Point): Point {
    if (k.cmp(new BN(0)) === 0) {
      return { x: new BN(0), y: new BN(0) };
    }
    if (this.isInfinity(point)) {
      return point;
    }
    let q: Point = { x: new BN(0), y: new BN(0) };
    let r: Point = point;

    while (k.cmp(new BN(0)) > 0) {
      if (k.and(new BN(1)).cmp(new BN(1)) === 0) {
        q = this.pointAdd(q, r);
      }
      r = this.pointDouble(r);
      k = k.shrn(1);
    }
    return q;
  }


  /**
   * isInfinity checks if `point` is `Infinity` (represented as `0`) on Elliptic Curve (ec).
   * @params Point on ec of type `Point`
   * @returns Boolean
   */
  public isInfinity(point: Point): Boolean {
    return point.x.isZero() || point.y.isZero() ? true : false;
  }

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
  public point(x: BN, y: BN): Point {
    return { x, y };
  }

}
