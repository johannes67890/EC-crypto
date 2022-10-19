import { BN } from "bn.js";
import { utils } from "hash.js";
// import { randomBytes } from "crypto";

const EC_GROUP_ORDER = Buffer.from(
  "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",
  "hex"
);
const ZERO32 = Buffer.alloc(32, 0);

function isValidPrivateKey(privateKey: Buffer) {
  return (
    privateKey.compare(ZERO32) > 0 && // > 0
    privateKey.compare(EC_GROUP_ORDER) < 0
  ); // < G
}

export function generatePrivateKey() {
  // const privateKey = randomBytes(32);
}

export function generatePublicKey(privateKey: Buffer) {}
