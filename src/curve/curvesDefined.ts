import hash from "hash.js";

interface curveOpt {
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
}

export const secp256k1: curveOpt = {
  name: "secp256k1",
  prime: "k256",
  p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
  a: "0",
  b: "7",
  n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
  h: "1",
  hash: hash.sha256,
  g: {
    x: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
    y: "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
  },
};
