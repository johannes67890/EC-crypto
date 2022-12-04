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
  p: "fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",
  a: "0",
  b: "7",
  n: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",
  h: "1",
  hash: sha256,
  g: {
    x: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
    y: "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
  },
  G: "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8"
};
