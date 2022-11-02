import BN from "bn.js";
import { Buffer } from "buffer";
import { utils } from "hash.js";

export function parseBytes(bytes: string) {
  return utils.toArray(bytes, "hex");
}
export function hashMsgSHA256(message: string): string {
  return hash.sha256().update(message).digest("hex");
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
