import BN from "bn.js";
import { randomBytes } from "crypto";
import { Point } from "./EC";
import { EC } from "./EC";
import { curveOpt } from "../curvesDefined";

/**
 *
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
   * Generate random `size` or 32 byte size private Key\
   *
   * @param size int of (Pref. even number)
   * @returns typeof `Key`
   */
  public generatePrivateKey(): BN {
    const priv = new BN(randomBytes(32), "hex");
    if(priv.cmp(this.n) === 1) { 
      // if priv > n
      return this.generatePrivateKey();
    }else return priv;
  }
  /**
   * Generates public key (`Q`) from @param privateKey (`d`) and curve generator point (`G`).\
   * Formular: `Q=dG`
   * @param privateKey of type `Key`
   * @returns typeof `Key`
   */
  public generatePublicKey(privateKey: BN): BN {
    
    return this.mulMod(privateKey, this.G);
  }
}
export default KeySet;
