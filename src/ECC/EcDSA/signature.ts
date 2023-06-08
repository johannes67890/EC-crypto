import BN from "bn.js";
import { randomBytes } from "crypto";
import { Point } from "../EC";
import EC from "../EC";
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
   * Compute Point multiplication of point `r`\
   * (where `r` y-cordinat is ignored: `r = x1`)
   * \
   *  computes `s` = (k^-1 * (h + r * d)) % n
   *
   * @param hashedMsg Hashed message to be signend
   * @param privateKey Private key used to sign message
   * @returns Digital signature `Point`.
   */
  private sign(
    hashedMsg: BN,
    privateKey: Point,
    preK?: BN | undefined,
  ): signature {
    // Generate random k (nonce) in interval [1,n-1] where n is order of curve
    let k: BN;

    if (preK) {
      k = preK;
    } else {
      do {
        k = new BN(randomBytes(32), "hex");
      } while (k.eqn(0));
    }

    // r = (x1, y1) = kG
    let point = this.pointMul(k, this.decompressPoint(this.G));
    const r = point.x;

    // s = (x2, y2) = k^-1 * (h + d * r) mod n
    const s = k
      .invm(this.n)
      .mul(hashedMsg.add(r.mul(privateKey.x)))
      .mod(this.n);

    return { r, s };
  }
  /**
   * Hashes message with SHA256 and signs it.
   * @param message hashed message
   * @param privateKey private key
   * @returns Point of signature
   */
  public signMsg(message: string, privateKey: Point, k?: BN): signature {
    const hashedMsg = hashMsgSHA256(message);
    return this.sign(hashedMsg, privateKey, k);
  }
  /**
   * Verifies digital signature.\
   * \
   * Computes Inverse signature `s` -> `sInv` = `s^-1` mod `n`\
   * Computes `u1` = `Msg * sInv` mod `n`\
   * Computes `u2` = `r * sInv` mod `n`\
   * Computes `r` = `u1 * G + u2 * Q` mod `n`\
   * \
   * If `r` == `signature.r` return `true` else `false`
   * @param hashedMsg Hashed message to be verified
   * @param signature signature of message
   * @param publicKey public key of signer
   * @returns boolean; true if signature is valid
   */
  private verify(hashedMsg: BN, signature: signature, publicKey: BN): boolean {
    const r = signature.r;
    const s = signature.s;

    if (r.gt(this.n) || s.gt(this.n)) {
      throw new Error("Invalid signature");
    }

    const sInv = s.invm(this.n);
    const u1 = hashedMsg.mul(sInv).mod(this.n);
    const u2 = r.mul(sInv).mod(this.n);

    if (hashedMsg.byteLength() > 32) {
      throw new Error("Hashed message is too long");
    }

    const p1 = this.pointMul(u1, this.decompressPoint(this.G));

    const p2 = this.pointMul(u2, this.decompressPoint(publicKey));

    const R = this.pointAdd(p1, p2).x;

    return r.eq(R);
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
    publicKey: Point
  ): boolean {
    const hashedMsg = hashMsgSHA256(message);
    if (!this.isOnCurve(publicKey)) {
      throw new Error("Invalid public key");
    } else {
      const pub = this.pointToBN(publicKey);
      return this.verify(hashedMsg, signature, pub);
    }
  }
}
export default Signature;
