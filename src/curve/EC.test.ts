import { EC } from "./EC";
import { BN } from "bn.js";
import { secp256k1 } from "./curvesDefined";
import KeySet from "./EDDSA/keyGeneration";

describe("EC", () => {
  const ec = new EC(secp256k1);

  it("Check if point is on curve", () => {
    /**
     * Predefined point on curve, valid point
     * x = 0C6047F9441ED7D6D3045406E95C07CD85C778E4B8CEF3CA7ABAC09B95C709EE5
     * y = 1AE168FEA63DC339A3C58419466CEAEEF7F632653266D0E1236431A950CFE52A
     */

    const { publicKey } = new KeySet(secp256k1);

    expect(ec.isOnCurve(ec.decompressPoint(publicKey))).toBeTruthy();
  });
  it("Check if point is infinity", () => {
    expect(ec.isInfinity({ x: new BN(0), y: new BN(0) })).toBe(true);
    expect(ec.isInfinity({ x: new BN(1), y: new BN(1) })).toBe(false);
  });
  it("concat Points", () => {
    expect(
      ec.pointToBN({ x: new BN("123", "hex"), y: new BN("456", "hex") })
    ).toEqual(new BN("123456", "hex"));
  });
});

describe("Matmatical components", () => {
  const ec = new EC(secp256k1);

  it("addMod computes z = (x + y) % p", () => {
    expect(ec.addMod(new BN(10), new BN(10))).toEqual(new BN(20));
  });
  it("subMod computes z = (x - y) % p", () => {
    expect(ec.subMod(new BN(5), new BN(2))).toEqual(new BN(3));
  });
  it("mulMod computes z = (x * y) % p", () => {
    expect(ec.mulMod(new BN(5), new BN(2))).toEqual(new BN(10));
  });
  it("expMod computes z = (x^^y) % p", () => {
    expect(ec.expMod(new BN(5), new BN(3))).toEqual(new BN(125));
  });
});

describe("Efficient Implementation of Elliptic Curves", () => {
  const ec = new EC(secp256k1);

  const x1 = new BN(15);
  const y1 = new BN(25);
  const x2 = new BN(5);
  const y2 = new BN(155);

  const p1 = ec.concatPoint(x1, y1);
  const p2 = ec.concatPoint(x2, y2);

  it("Point Addition", () => {
    // Pre-computed result
    expect(
      ec.pointAdd(p1, p2).x.eq(new BN(149)) &&
        ec.pointAdd(p1, p2).y.eq(new BN(1717))
    ).toBeTruthy();
  });

  it("Point Multiplication", () => {
    // Pre-computed result (res)
    const resX = new BN(
      "c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5",
      "hex"
    );
    const resY = new BN(
      "1ae168fea63dc339a3c58419466ceaeef7f632653266d0e1236431a950cfe52a",
      "hex"
    );
    expect(
      ec.pointMul(new BN(2), ec.concatPoint(ec.Gx, ec.Gy)).x.eq(resX) &&
        ec.pointMul(new BN(2), ec.concatPoint(ec.Gx, ec.Gy)).y.eq(resY)
    ).toBeTruthy();
  });

  it("Point Doubling", () => {
    // Pre-computed result (res)
    const res = ec.concatPoint(
      new BN(
        "3FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFA4",
        "hex"
      ),
      new BN(
        "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDFFFF830",
        "hex"
      )
    );

    expect(
      ec.pointDouble(p1).x.eq(res.x) && ec.pointDouble(p1).y.eq(res.y)
    ).toBeTruthy();
  });
});
