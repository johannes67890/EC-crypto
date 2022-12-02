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
    const privateKey = new KeySet(secp256k1).generatePrivateKey(32);
    expect(privateKey).toBeDefined();
    expect(privateKey.x.toArray() && privateKey.y.toArray()).toHaveLength(16);
  });

  it("Generate Public key", () => {
    // TODO: test this
    const privateKey = new KeySet(secp256k1).generatePrivateKey(32);
    const publicKey = new KeySet(secp256k1).generatePublicKey(privateKey);
    expect(publicKey).toBeDefined();
    expect(publicKey.x.toArray() && publicKey.y.toArray()).toHaveLength(32);
  });
});
