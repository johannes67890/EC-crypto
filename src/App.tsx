import React from "react";
import KeySet from "./curve/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
function App() {
  const x = new KeySet(secp256k1);
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <button onClick={() => x.sign("w", x.generatePrivateKey(32))}>
        Click
      </button>
    </div>
  );
}

export default App;
