import React, { createContext } from "react";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import Menu from "./frontend/Menu";
import Keys from "./frontend/Keys";
import { EDDSA, Point } from "./curve/EDDSA/EDDSA";
import Signature from "./curve/EDDSA/signature";
import { BN } from "bn.js";
import { hashMsgSHA256, parseBytes } from "./util";
import { sha256 } from "hash.js";

const bob = new KeySet(secp256k1);
const alice = new KeySet(secp256k1);

export const KeysetContext = createContext([bob, alice]);

function App() {
  test();
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <Menu />
      <KeysetContext.Provider value={[bob,alice]}>
        <Keys />
      </KeysetContext.Provider>
    </div>
  );
}

function test() {
  const bob = new KeySet(secp256k1);
  const alice = new KeySet(secp256k1);
  const eddsa = new EDDSA(secp256k1);
  const sig = new Signature(secp256k1);

  const message = "Hello 123";;

  const priv = eddsa.point(new BN("709093e393fd7708714813e85d6520c326de7b807ac728654cd2ffcf60e1875b", "hex"), new BN("0", "hex"))
  const pubX = new BN("647e75683627944e38f6a534f79922c4b79f28be4a3eaebc3eeac703b2e6c1ec", "hex");
  const pubY = new BN("f734bab40dd2d6f64346d3b44f8ee9562699a901f4729627fd1ba01de0dae554","hex");
  const pub = eddsa.point(pubX, pubY);
  const siga = sig.makeSignature("c3fba1eefbc4f7246a77f9958c63bab9b2507358336f5ee62ad6c3c36fe0768c", "7ca4b09a9c245a904ac49eca54bd9343e40ab007077d450f66c163dbacb83163")

  const signature = sig.signMsg(message, priv);
  const verified = sig.verifyMsg(message, siga, pub);

 console.log("Verified: ", verified);
  
  
  console.log("Bob + Alice", eddsa.pointAdd(bob.publicKey, alice.publicKey).x.toString(10));
  // console.log("is on curve", keySet.isOnCurve(keySet.publicKey));
}

export default App;
