import React, { createContext } from "react";
import KeySet from "./curve/EDDSA/keyGeneration";
import { secp256k1 } from "./curve/curvesDefined";
import Header from "./frontend/Header";
import Menu from "./frontend/Menu";
import Keys from "./frontend/Keys";

const keySet = new KeySet(secp256k1);
export const KeysetContext = createContext(keySet);

function App() {
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

export default App;
