import { EC } from "./EC";
import KeySet from "./keyGeneration";
import { secp256k1 } from "../curvesDefined";

describe("first", () => {
  it("Generate Keypair", () => {
    const keypair = new KeySet(secp256k1);
    const { publicKey, privateKey } = keypair;
    expect(keypair).toBeInstanceOf(EC);

    expect(publicKey).toBeDefined();
    expect(privateKey).toBeDefined();
  });

  it("Generate Private key", () => {
    // TODO: test
    const privateKey = new KeySet(secp256k1).generatePrivateKey(32);
    expect(privateKey).toBeDefined();
  });
});
