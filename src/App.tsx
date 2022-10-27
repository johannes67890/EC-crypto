import React, { useState } from "react";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import { Point } from "./curve/EDDSA";
function App() {
  const keySet = new KeySet(secp256k1);

  const [priv, setPriv] = useState<Point>();
  const [pub, setPub] = useState<Point>();

  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <button
        onClick={() => {
          setPriv(keySet.generatePrivateKey(32));
          setPub(keySet.generatePublicKey(priv));
        }}
      >
        Click
      </button>

      <div>
        <h3>Infomation</h3>
        <ul>
          <p>Pirvate key</p>
          <li>{priv.x.toString("hex")}</li>
          <li>{priv.y.toString("hex")}</li>
          <p>Public key</p>
          <li>{pub.x.toString("hex")}</li>
          <li>{pub.y.toString("hex")}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
