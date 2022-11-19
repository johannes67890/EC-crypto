import React, { createContext } from "react";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import Menu from "./frontend/Menu";
import Keys from "./frontend/Keys";
import { EDDSA } from "./curve/EDDSA/EDDSA";
import Signature from "./curve/EDDSA/signature";

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

  const message = "Hello World";
  console.log("Message: ", message);
  
  const signature = sig.signMsg(message, bob.privateKey);
  const verified = sig.verifyMsg(message, signature, bob.publicKey);

  console.log("Signature: ", signature);
  console.log("Verified: ", verified);
  
  
  console.log("Bob + Alice", eddsa.pointAdd(bob.publicKey, alice.publicKey).x.toString(10));
  // console.log("is on curve", keySet.isOnCurve(keySet.publicKey));
}

export default App;
