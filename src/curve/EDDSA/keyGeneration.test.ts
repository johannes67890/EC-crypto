import { EC } from "./EC";
import KeySet from "./keyGeneration";
import { secp256k1 } from "../curvesDefined";
import { BN } from "bn.js";

describe("first", () => {
  const keySet = new KeySet(secp256k1);

  it("Generate Keypair", () => {
    const keypair = new KeySet(secp256k1);
    const { publicKey, privateKey } = keypair;
    expect(keypair).toBeInstanceOf(EC);

    expect(publicKey).toBeDefined();
    expect(privateKey).toBeDefined();
  });

  it("Generate Private key", () => {
    const privateKey = new KeySet(secp256k1).generatePrivateKey();

    expect(privateKey).toBeDefined();
    expect(privateKey.byteLength()).toEqual(32);
  });

  it("Generate Public key", () => {
    const { privateKey, publicKey } = new KeySet(secp256k1);

    expect(publicKey).toBeDefined();
    expect(publicKey.byteLength()).toEqual(64);
    expect(keySet.generatePublicKey(privateKey).eq(publicKey)).toBeTruthy();
    // Pre-generated keypair
    const priv = new BN(
      "679b09c43018e7f2687db0f33fc274fb44b8a3a2c0d21079e9b68f381cc0848b",
      "hex"
    );
    const pub = new BN(
      "d8a3e187367ae5bd066da4b9ea617b020eedfb2bf0a13ad4b931413acc4b64fb532717eca31adb098ae64c01fd4acd44c767011d75ff949e248763e3a68ee50f",
      "hex"
    );
    expect(keySet.generatePublicKey(priv).eq(pub)).toBeTruthy();
  });
});
