import { sha256 } from "hash.js";
export interface curveOpt {
  name: string; // Name of the curve
  prime: string; // modulo prime number p
  p: string; // prime order p
  a: string; // 'a' of equation
  b: string; // 'b' of equation
  n: string; // curve order
  h: string; //
  hash: Sha224Constructor | Sha256Constructor | Sha512Constructor; // hash algorithem used
  g: {
    // Base point
    x: string;
    y: string;
  };
  G: string; // Base point uncompressed 
}

export const secp256k1: curveOpt = {
  name: "secp256k1",
  prime: "k256",
  p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
  a: "0",
  b: "7",
  n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
  h: "1",
  hash: sha256,
  g: {
    x: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
    y: "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
  },
  G: "79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798 483ADA77 26A3C465 5DA4FBFC 0E1108A8 FD17B448 A6855419 9C47D08F FB10D4B8"
};
