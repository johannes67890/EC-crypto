import { useState } from 'react'
import KeySet from './ECC/EcDSA/keyGeneration'

import { secp256k1 } from './ECC/curvesDefined'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

const keyset = new KeySet(secp256k1)

  console.log(keyset.privateKey.toString('hex'));
  
  return (
    <>
      <div className='w-10 bg-red-100 h-20'>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    
    </>
  )
}

export default App
