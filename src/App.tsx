import React, { createContext } from "react";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import Menu from "./frontend/Menu";
import Keys from "./frontend/Keys";
import { EDDSA } from "./curve/EDDSA/EDDSA";

const keySet = new KeySet(secp256k1);
export const KeysetContext = createContext(keySet);

function App() {
  test();
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <Menu />
      <KeysetContext.Provider value={keySet}>
        <Keys />
      </KeysetContext.Provider>
    </div>
  );
}

function test() {
  const bob = new KeySet(secp256k1);
  const alice = new KeySet(secp256k1);
  const eddsa = new EDDSA(secp256k1);

  //p1 = new BN(2, 10) ;
  // console.log("Bob Private key", bob.privateKey);
  // console.log("Bob Public key", bob.publicKey);
  // console.log("Alice Private key", alice.privateKey);
  // console.log("Alice Public key", alice.publicKey);
  // console.log("Bob + Alice", eddsa.pointAdd(, alice.publicKey));
  // console.log("is on curve", keySet.isOnCurve(keySet.publicKey));
}

export default App;
