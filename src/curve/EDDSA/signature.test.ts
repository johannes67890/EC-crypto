import { secp256k1 } from "../curvesDefined";
import { EC } from "./EC";
import Signature, { signature } from "./signature";
import KeySet from "./keyGeneration";
import BN from "bn.js";

describe("ECDSA", () => {
  const ec = new EC(secp256k1);
  const signature = new Signature(secp256k1);
  const keySet = new KeySet(secp256k1);
  const { privateKey, publicKey } = keySet;

  it("should sign a signature", () => {
    // pre generated signature
    const k = new BN(12345);
    const message = "ECDSA is the most fun I have ever experienced";
    const priv = new BN(
      "F94A840F1E1A901843A75DD07FFCC5C84478DC4F987797474C9393AC53AB55E6",
      "hex"
    );
    const r = new BN(
      "F01D6B9018AB421DD410404CB869072065522BF85734008F105CF385A023A80F",
      "hex"
    );
    const s = new BN(
      "A3243A18521B20DC80A8798A1A36463FFE8279574127DA214D39E6B34134305B",
      "hex"
    );

    const sig = signature.signMsg(message, ec.decompressPoint(priv), k);

    expect(sig).toBeDefined();
    expect(priv.byteLength()).toEqual(32);

    expect(sig.r.toString("hex")).toEqual(r.toString("hex"));
    expect(sig.s.toString("hex")).toEqual(s.toString("hex"));
  });

  it("Validate signature", () => {
    const message = "ECDSA is the most fun I have ever experienced";
    const sig = signature.signMsg(message, ec.decompressPoint(privateKey));

    const valid = signature.verifyMsg(
      message,
      sig,
      ec.decompressPoint(publicKey)
    );
    expect(valid).toBeTruthy();
  });
});
