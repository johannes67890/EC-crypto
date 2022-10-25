import { BN } from "bn.js";
import { curveOpt } from "./curvesDefined";
import { randomBytes } from "crypto";
import { Key } from "./keyGeneration";

interface Signature {}

class Signature {
  constructor(curve: curveOpt) {}

  /**
   *
   * @param hashedMsg
   * @param privateKey
   */
  public sign(hashedMsg: string, privateKey: Key) {
    //Method used: https://learnmeabitcoin.com/technical/ecdsa#elliptic-curves

    const k = new BN(randomBytes(4), 16); // random number
  }
}
