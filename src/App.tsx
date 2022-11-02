import React, { useState } from "react";
import { BN } from "bn.js";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import { Point } from "./curve/EDDSA";

function App() {
  const keySet = new KeySet(secp256k1);

  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <button
        onClick={() => {
          console.log(keySet.isOnCurve(keySet.privateKey));
        }}
      >
        Click
      </button>

      <div>
        <h3>Infomation</h3>
        <ul>
          <p>Private key</p>
          <li>
            <span>x: </span>
            {keySet.privateKey.x.toString("hex")}
          </li>
          <li>
            <span>y: </span>
            {keySet.privateKey.y.toString("hex")}
          </li>
          <p>Public key</p>
          <li>{keySet.publicKey.x.toString("hex")}</li>
          <li>{keySet.publicKey.y.toString("hex")}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
