import BN from "bn.js";
import { sha256, utils } from "hash.js";

export function parseBytes(bytes: string) {
  return utils.toArray(bytes, "hex");
}
/**
 * Hashes message with SHA256
 * @param message message to be hashed
 * @returns digest of message in 'hex' format
 */
export function hashMsgSHA256(message: string): BN {
  return new BN(sha256().update(message).digest("hex"), "hex");
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getByteSize(val: BN) {
  return val.byteLength();
}

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" "); // function to combind classNames
}
