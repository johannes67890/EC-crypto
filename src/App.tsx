import React, { createContext } from "react";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import Menu from "./frontend/Menu";
import Keys from "./frontend/Keys";
import { EC, Point } from "./curve/EDDSA/EC";
import Signature, { signature } from "./curve/EDDSA/signature";
import { BN } from "bn.js";

const bob = new KeySet(secp256k1);
const alice = new KeySet(secp256k1);

export const KeysetContext = createContext([bob, alice]);

function App() {
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <Menu />
      <KeysetContext.Provider value={[bob, alice]}>
        <Keys />
      </KeysetContext.Provider>
    </div>
  );
}

export default App;
