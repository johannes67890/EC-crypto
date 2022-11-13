import React, { createContext } from "react";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import Menu from "./frontend/Menu";
import CurveText from "./frontend/CurveText";
import { Point } from "./curve/EDDSA";

const keySet = new KeySet(secp256k1);

export const KeysetContext = createContext(keySet);

function App() {
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <KeysetContext.Provider value={keySet}>
        <Menu />
        <CurveText />
      </KeysetContext.Provider>
    </div>
  );
}

export default App;
