import { Buffer } from "buffer";
import { utils } from "hash.js";

export function parseBytes(bytes: string) {
  return utils.toArray(bytes, "hex");
}
export function hashMsgSHA256(message: string): string {
  return hash.sha256().update(message).digest("hex");
}
