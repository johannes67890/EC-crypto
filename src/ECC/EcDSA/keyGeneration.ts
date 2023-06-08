import BN from "bn.js";
import { randomBytes } from "crypto";
import EC from "../EC";
import { curveOpt } from "../curvesDefined";
/**
 * Generates a new key pair, private and public key.
 *
 * @class KeySet
 * @description Generates a new key pair
 * @param curve of type `curveOpt`
 * @returns `KeySet` object
 */
class KeySet extends EC {
  public publicKey: BN;
  public privateKey: BN;
  
  constructor(curve: curveOpt) {
    super(curve);
    const PRIVATE_KEY = this.generatePrivateKey();
    this.privateKey = PRIVATE_KEY;
    this.publicKey = this.generatePublicKey(PRIVATE_KEY);
  }

  /**
   * Generate random 32 byte size private Key\
   *
   * @returns typeof `BN`
   */
  public generatePrivateKey(): BN {
    const priv = new BN(randomBytes(32), "hex");
    if (priv.cmp(this.n) === 1) {
      // if priv > n
      return this.generatePrivateKey();
    } else return priv;
  }
  /**
   * Generates public key (`Q`) from @param privateKey (`d`) and curve generator point (`G`).\
   * Formular: `Q=dG`
   * @param privateKey of type `BN`
   * @returns typeof `BN`
   */
  public generatePublicKey(privateKey: BN): BN {
    const pubPoint = this.pointMul(
      privateKey,
      this.concatPoint(this.Gx, this.Gy)
    );
    return this.pointToBN(pubPoint);
  }
}
export default KeySet;
