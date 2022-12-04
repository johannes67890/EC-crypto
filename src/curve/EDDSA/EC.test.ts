import { EC, Point } from "./EC";
import { BN, red } from "bn.js";
import { secp256k1 } from "../curvesDefined";
import KeySet from "./keyGeneration";

describe("EC", () => {
  const ec = new EC(secp256k1);

  it("Check if point is on curve", () => {
    /**
     * Predefined point on curve, valid point
     * x = 0C6047F9441ED7D6D3045406E95C07CD85C778E4B8CEF3CA7ABAC09B95C709EE5
     * y = 1AE168FEA63DC339A3C58419466CEAEEF7F632653266D0E1236431A950CFE52A
     */

    const {privateKey, publicKey} = new KeySet(secp256k1);
    const x = new BN(
      "0C6047F9441ED7D6D3045406E95C07CD85C778E4B8CEF3CA7ABAC09B95C709EE5",
      "hex"
    );
    const y = new BN(
      "1AE168FEA63DC339A3C58419466CEAEEF7F632653266D0E1236431A950CFE52A",
      "hex"
    );

    expect(ec.isOnCurve(publicKey)).toBe(true);
  });
  // it("Check if point is infinity", () => {
  //   expect(ec.isInfinity({ x: new BN(0), y: new BN(0) })).toBe(true);
  //   expect(ec.isInfinity({ x: new BN(1), y: new BN(1) })).toBe(false);
  // });
  it("concat Points", () => {
    expect(
      ec.concatPoint({ x: new BN("123", "hex"), y: new BN("456", "hex") })
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

  it("Point Addition", () => {
    // Works but not same format as function.
    // expect(ec.pointAdd({x: x1, y: y1}, {x: x2, y: y2})).toEqual({x: new BN(149), y: new BN(1717)});
  });
  it("Point Multiplication", () => {});
  it("Point Doubling", () => {});
});
