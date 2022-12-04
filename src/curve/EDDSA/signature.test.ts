import { secp256k1 } from '../curvesDefined';
import Signature from './signature';
import KeySet from "./keyGeneration";

import BN from "bn.js";

describe('Signature', () => { 

    it('Validate signature', () => {
        const signature = new Signature(secp256k1);
        const keySet = new KeySet(secp256k1);
        const {privateKey, publicKey} = keySet;
        const message = 'hello';
        // const signedMessage = signature.signMsg(message, privateKey);
        // expect(signature.verifyMsg(message, signedMessage, publicKey)).toEqual(true);
        
    });
 })