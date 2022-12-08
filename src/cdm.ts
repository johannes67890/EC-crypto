import { EC } from './curve/EC';
import KeySet from "./curve/EDDSA/keyGeneration";
import Signature from "./curve/EDDSA/signature";
import { secp256k1 } from './curve/curvesDefined';
import { hashMsgSHA256 } from './util';
import chalk from 'chalk';

/**
 * Run the CDM
 * To run this script: `npm run cdm`
 */

function CDMrunECDSA() {
    console.log(chalk.green("Elliptic Curve Digital Signature Algorithm"));
    console.log(chalk.gray("Curve: ", secp256k1.name, "\n"));
    
    // Create and initialize EC context & signature
    const ec = new EC(secp256k1); 
    const signature = new Signature(secp256k1);
    
    // Generate key pair
    const keySet = new KeySet(secp256k1);
    const {privateKey, publicKey } = keySet;

    console.log("Private key: ", `(${privateKey.byteLength()} bytes)`, "\n", chalk.redBright(privateKey.toString("hex"),"\n"));
    console.log("Public key: ", `(${publicKey.byteLength()} bytes)`, "\n",
    chalk.blueBright( "X: ", ec.decompressPoint(publicKey).x.toString("hex"), "\n"),
    chalk.redBright("Y: ", ec.decompressPoint(publicKey).y.toString("hex"), "\n"));
    
    // Sign message
    const message = "Hello World!";
    console.log("Message: ",chalk.cyan(message), "\n");
    // Hashed message with SHA256.
    console.log("Message hash (SHA256):", `(${hashMsgSHA256(message).byteLength()} bytes)`, "\n", `${hashMsgSHA256(message).toString('hex')}`, "\n");
    

    const signatureValue = signature.signMsg(message, ec.decompressPoint(privateKey)); // Decopmress private key to match signature function.
    console.log(`Signature:`, signatureValue, "\n"); // Return signature {r,s} as hex string
    
    // Verify signature
    const verify = signature.verifyMsg(message, signatureValue, ec.decompressPoint(publicKey)); // Decopmress public key to match signature function.
    console.log("Verify: ", verify, "\n"); // Return true or false
}




CDMrunECDSA();



