import React from "react";
import { generatePrivateKey } from "./curve/keyGeneration";
import Header from "./frontend/Header";
function App() {
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <button onClick={() => generatePrivateKey(32)}>Click</button>
    </div>
  );
}

export default App;
