import { BN } from "bn.js";
import { utils } from "hash.js";
import { secp256k1, curveOpt } from "./curvesDefined";
import { Buffer } from "buffer";
import { randomBytes } from "crypto";

export function generatePrivateKey(size: number): Buffer {
  const PRIVATE_KEY = Buffer.alloc(size, randomBytes(size));
  console.log(generatePublicKey(secp256k1, PRIVATE_KEY));

  return PRIVATE_KEY;
}

export function generatePublicKey(curve: curveOpt, privateKey: Buffer) {
  //console.log("Private", utils.toHex(Buffer.from(privateKey)));

  //let pri = utils.toArray(Buffer.from(privateKey), "hex");
  let pri = utils.toArray(
    "46 b9 e8 61 b6 3d 35 09 c8 8b 78 17 27 5a 30 d2",
    "hex"
  );
  let x = utils.toArray(curve.g.x, "hex");
  let y = utils.toArray(curve.g.y, "hex");
  let p = utils.toArray(curve.p, "hex");
  let tx = [];
  //let ty = [];
  for (var i = 0; i < 32; i++) {
    tx[i] = x[i] * pri[i];
    // for (let j = 0; j < 32; j++) {
    //   ty[j] = y[j] * pri[j];
    // }
  }
  console.log("pri", utils.toHex(pri));

  console.log("x", utils.toHex(tx));
  // console.log("y", utils.toHex(ty).length);

  return Buffer.alloc(64);
}
