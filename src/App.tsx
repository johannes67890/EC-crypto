import React, { createContext } from "react";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import Menu from "./frontend/Menu";
import Keys from "./frontend/Keys";
import { EDDSA, Point } from "./curve/EDDSA/EC";
import Signature, { signature } from "./curve/EDDSA/signature";
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

  const priv = eddsa.point(new BN("f80a456519f720cb97b824785ffb9a23902fa6900eec1ca649d0b00d04df9331", "hex"), new BN("0", "hex"))
  const pubX = new BN("4ac418303502389efd91a43a0b249672718796521e764a0aa66c09fc314110b4", "hex");
  const pubY = new BN("530421800fc9f43baedd9748ab20724ed3b36f113cfffd56758d223ddb3d550c","hex");
  const pub = eddsa.point(pubX, pubY);
  const siga: signature = {r: new BN("cf42a9bf740f74575f7b050c81b7f851ebc451608455578d3a40786e6f38605c", "hex") , 
  s: new BN("a218de609adacd99aa1d5242cf9d8fa58eb0094064d2781322c97bab7faef647","hex")}


//   const signature = sig.signMsg(message, priv);
//   const verified = sig.verifyMsg(message, siga, pub);

//   console.log("signature: ", signature);
//  console.log("Verified: ", verified);

//eddsa.pointAdd(pub, pub);
eddsa.pointDouble(pub);
}


export default App;
