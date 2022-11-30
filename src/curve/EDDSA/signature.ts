import BN from "bn.js";
import { randomBytes } from "crypto";
import { Point } from "./EC";
import { EC } from "./EC";
import { hashMsgSHA256 } from "../../util";

export interface signature {
  r: BN;
  s: BN;
}

class Signature extends EC {
  /**
   * Selects a random int `k` in interval `[1,n-1]`.\
   * if `k` is `0`, generate new `k`.\
   * \
   * Compute inverse modulo of point `r`\
   * (where `r` y-cordinat is ignored: `r = x1`)
   * \
   *  computes `s` = (k^-1 * (h + r * d)) % n
   *
   * @param hashedMsg Hashed message to be signend
   * @param privateKey Private key used to sign message
   * @returns Digital signature `Point`.
   */
  private sign(hashedMsg: string, privateKey: Point): signature {
    //Method used: https://learnmeabitcoin.com/technical/ecdsa#elliptic-curves
    // generate random k (nonce) in interval [1,n-1] where n is order of curve
    let k: BN;
    
    do {
      k = new BN(randomBytes(32), "hex");
    } while (k.eqn(0));

    // r = (x1, y1) = kG
    const r = this.mulMod(k, this.Gx);
    // s = (x2, y2) = k^-1 * (h + d * r) mod n
    const s = k
      .invm(this.n)
      .mul(new BN(hashedMsg, "hex").add(r.mul(privateKey.x)))
      .mod(this.n);
    
    return { r, s };
  }
  /**
   * Hashes message with SHA256 and signs it.
   * @param message hashed message
   * @param privateKey private key
   * @returns Point of signature
   */
  public signMsg(message: string, privateKey: Point): signature {
    const hashedMsg = hashMsgSHA256(message);
    console.log("Sign hashedMsg: ", hashedMsg);

    return this.sign(hashedMsg, privateKey);
  }
  /**
   * Verifies digital signature.\
   * \
   * Computes Inverse signature `s` -> `sInv` = `s^-1` mod `n`\
   * Computes `u1` = `Msg * sInv` mod `n`\
   * Computes `u2` = `r * sInv` mod `n`\
   * Computes `r` = `u1 * Gx + u2 * Qx` mod `n`\
   * \
   * If `r` == `signature.r` return `true` else `false`
   * @param hashedMsg Hashed message to be verified
   * @param signature signature of message
   * @param publicKey public key of signer
   * @returns boolean; true if signature is valid
   */
  private verify(
    hashedMsg: string,
    signature: signature,
    publicKey: BN
  ): boolean {
    // const red = BN.red(this.n);
    // const r = signature.r
    // const s = signature.s
    const r = new BN("6f0156091cbe912f2d5d1215cc3cd81c0963c8839b93af60e0921b61a19c5430", "hex")
    const s = new BN("c71006dd93f3508c432daca21db0095f4b16542782b7986f48a5d0ae3c583d4","hex")
    const pub = new BN("7b83ad6afb1209f3c82ebeb08c0c5fa9bf6724548506f2fb4f991e2287a77090177316ca82b0bdf70cd9dee145c3002c0da1d92626449875972a27807b73b42e", "hex");
    const pubCompressed = new BN("027b83ad6afb1209f3c82ebeb08c0c5fa9bf6724548506f2fb4f991e2287a77090","hex")
    const msg = new BN("ce7df6b1b2852c5c156b683a9f8d4a8daeda2f35f025cb0cf34943dcac70d6a3", "hex")
   
    if(r.gt(this.n) || s.gt(this.n)){
      throw new Error("Invalid signature");
    }
    

    // s^-1 mod n
    const sInv = s.invm(this.n);
    console.log("sINv",sInv.toString("hex"));

    
    // u1 = h * s^-1 * G
    //const u1 = (msg.mul(sInv)).mul(this.G).mod(this.n); // gx? 
    const u1 = msg.mul(sInv).mod(this.n);
    console.log("u1",u1.toString("hex"));
    
    // u2 = r * s^-1 * Q
    //const u2 = (r.mul(sInv)).mul(pub).mod(this.n); // qx?
    const u2 = r.mul(sInv).mod(this.n);
    console.log("u2",u2.toString("hex"));

    // const R = u1.add(u2).mod(this.n);
    const R = u1.mul(this.G).add(u2.mul(pub)); // this mod n? & Gx?
    
    console.log("R",R.toString("hex"));
    console.log("r",r.toString("hex"));
    

    return r.eq(R.mod(this.n));
  }
  /**
   * Hashes message with SHA256 and verifies it.
   * @param message message to be verified
   * @param signature signature of message
   * @param publicKey public key of signer
   * @returns boolean; true if signature is valid
   */
  public verifyMsg(
    message: string,
    signature: signature,
    publicKey: BN
  ): boolean {
    const hashedMsg = hashMsgSHA256(message);
    console.log("Verify hashedMsg: ", hashedMsg);
    
    return this.verify(hashedMsg, signature, publicKey);
  }
}
export default Signature;