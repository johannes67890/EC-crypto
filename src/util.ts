import { Buffer } from "buffer";
import { utils } from "hash.js";

export function getRandomBytes(size: number): Buffer {
  let randomByte = Math.random() * 256;
  console.log(randomByte);

  const res = utils.toHex(randomByte);
  return Buffer.alloc(size, res);
}
