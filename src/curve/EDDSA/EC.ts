import BN from "bn.js";
import { curveOpt } from "../curvesDefined";

export interface Point {
  x: BN;
  y: BN;
}

export class EC {
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
    if (!(this instanceof EC)) {
      return new EC(curve);
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
    const red = BN.mont(this.p);
    const a = this.a.toRed(red);
    const b = this.b.toRed(red);
    const x = point.x.toRed(red);
    const y = point.y.toRed(red);

    if (this.isInfinity(point)) {
      return false;
    }
    const left = y.redSqr();
    const right = x.redSqr().redMul(x).redIAdd(a.redMul(x)).redIAdd(b);

    if (left.cmp(right) === 0) {
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
    const x1 = point1.x.toRed(red);
    const y1 = point1.y.toRed(red);
    const x2 = point2.x.toRed(red);
    const y2 = point2.y.toRed(red);

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

    // s = (y2 - y1) / (x2 - x1)
    const s = y2.redSub(y1).redMul(x2.redSub(x1).redInvm());

    // x3 = s**2 - x1 - x2
    const x3 = s.redSqr().redSub(x1).redSub(x2);

    // // computes y3 = s * (x1 - x3) - y1
    const y3 = s.redMul(x1.redSub(x3)).redSub(y1);

    return { x: x3.fromRed(), y: y3.fromRed() };
  }

  /**
   * pointdouble computes the sum of two points on the elliptic curve.
   *
   * @param point Point of the ec of type `Point`
   * @returns Point of the ec of type `Point`
   */
  public pointDouble(point: Point): Point {
    const red = BN.mont(this.p);
    const a = this.a.toRed(red);
    const x = point.x.toRed(red);
    const y = point.y.toRed(red);

    if (this.isInfinity(point)) {
      return point;
    }

    const redVal2 = new BN(2).toRed(red);
    const redVal3 = new BN(3).toRed(red);
    // s = (3 * x**2 + a) / (2 * y)
    const s = x
      .redSqr()
      .redMul(redVal3)
      .redIAdd(a)
      .redMul(y.redMul(redVal2).redInvm());
    // x3 = s**2 - 2 * x
    const x3 = s.redSqr().redSub(x.redMul(redVal2));
    // y3 = s * (x - x3) - y
    const y3 = s.redMul(x.redSub(x3)).redSub(y);

    return { x: x3.fromRed(), y: y3.fromRed() };
  }
  /**
   * pointMul multiplies a `point` by the scalar `k`.
   *
   * @param k Amount to multiply by.
   * @param point point to multiply.
   * @returns New ``point``.
   */
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
   * subMod computes z = (x - y) % p.
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
   * expMod computes z = (x^^y) % p.
   */
  public expMod(x: BN, y: BN) {
    let z = new BN(0);
    z = x.pow(y).mod(this.p);

    return z;
  }

  /**
   * Converts a point to a BN.\
   *
   * @param point Point to convert of type `Point`
   * @returns New BN
   */
  public pointToBN(point: Point): BN {
    const xHex = point.x.toString(16);
    const yHex = point.y.toString(16);
    const xyHex = xHex + yHex;
    const xy = new BN(xyHex, 16);
    return xy;
  }

  /**
   * Decompresses a point from a BN.\
   *
   * @param xy Point to decompress of type `BN`
   * @returns New Point
   */
  public decompressPoint(xy: BN): Point {
    const xHex = xy.toString(16).slice(0, 64);
    const yHex = xy.toString(16).slice(64, 128);
    const x = new BN(xHex, 16);
    const y = new BN(yHex, 16);
    return { x, y };
  }
  /**
   * ConcatPoint concatenates two BNs into a point.\
   *
   * @param x x coordinate of the point
   * @param y y coordinate of the point
   * @returns New `Point`
   */
  public concatPoint(x: BN, y: BN): Point {
    return { x, y };
  }
}
