import { BN } from "bn.js";
import { utils } from "hash.js";
import { secp256k1, curveOpt } from "./curvesDefined";
import { Buffer } from "buffer";
import { randomBytes } from "crypto";

interface Key {
  x: string;
  y: string;
}

export function generatePrivateKey(size: number | undefined): Key {
  let PRIVATE_KEY: Key;
  if (new BN(size).isEven()) {
    PRIVATE_KEY = {
      x: utils.toHex(randomBytes(size / 2)),
      y: utils.toHex(randomBytes(size / 2)),
    };

    console.log(generatePublicKey(secp256k1, PRIVATE_KEY));
  } else if (size == undefined) {
    PRIVATE_KEY = {
      x: utils.toHex(randomBytes(32 / 2)),
      y: utils.toHex(randomBytes(32 / 2)),
    };
  } else throw new Error("Invalid key Size on Private key");
  return PRIVATE_KEY;
}

export function generatePublicKey(curve: curveOpt, privateKey: Key): Key {
  /**
   * TODO: this might be wrong
   * Dubble check
   */
  const PriavteX = new BN(privateKey.x, "hex");
  const PriavteY = new BN(privateKey.y, "hex");

  const Gx = new BN(curve.g.x, "hex");
  const Gy = new BN(curve.g.x, "hex");
  const p = new BN(curve.p, "hex");

  const pubX = PriavteX.mul(Gx).mod(p);
  const pubY = PriavteY.mul(Gy).mod(p);

  console.log(pubX.byteLength() + pubY.byteLength());

  return { x: pubX.toString("hex"), y: pubY.toString("hex") };
}
