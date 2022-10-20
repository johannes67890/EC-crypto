import { Buffer } from "buffer";
import { utils } from "hash.js";

export function parseBytes(bytes: string) {
  return utils.toArray(bytes, "hex");
}
