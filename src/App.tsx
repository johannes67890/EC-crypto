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
  test();
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

function test() {
  const bob = new KeySet(secp256k1);
  const alice = new KeySet(secp256k1);
  const ec = new EC(secp256k1);
  const sig = new Signature(secp256k1);

  const x1 = new BN(15);
  const y1 = new BN(25);
  const x2 = new BN(5);
  const y2 = new BN(155);

  const p1 = ec.point(x1, y1);
  const p2 = ec.point(x2, y2);

  const res = ec.point(
    new BN("3FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFA4","hex"), 
    new BN("1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDFFFF830","hex"));

   console.log("output", ec.pointDouble(p1));
   console.log("res", res);
   
}

export default App;
