# EC-crypto
Visual demonstration of Elliptic-curve cryptography in the command prompt.
## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Showcase](#showcase)
- [Instructions](#instructions)
- [Supported Curves](#supported-curves)
- [3rd party libraries used](#supported-curves)

## Install
Clone and install this Github repository
```git 
git clone https://github.com/johannes67890/EC-crypto.git
```
```
npm install
```

## Usage
```js
// Run command prompt application
> npm run cdm

// Run test of the applications functions
> npm run test
```
## Elliptic Curve Digital Signature Algorithm
### Showcase
```typescript
// Create and initialize EC & signature context
const ec = new EC(secp256k1); 
const signature = new Signature(secp256k1);

// Generate key pair
const keySet = new KeySet(secp256k1);
const {privateKey, publicKey } = keySet;

// Message to sign
const message = "Hello World!";

// Sign: Hashes and signs thhe decopmressed private key to the signature function.
const signatureValue = signature.signMsg(message, ec.decompressPoint(privateKey)); 
    
// Verify: Decopmress public key to verify match of signature function.
const verify = signature.verifyMsg(message, signatureValue, ec.decompressPoint(publicKey)); 

console.log("Verify: ", verify); // Return true or false
```

# Instructions

## Types
```typescript
// Holds x & y cordinats of the corresponding Point 
interface Point {
  x: BN;
  y: BN;
}

interface signature {
// Holds r & s cordinats of the corresponding signature 
  r: BN;
  s: BN;
}
```

## Functions
### Utils
* `isOnCurve(Point)` - Check if `Point` is on curve.
* `isInfinity(Point)` - Check if `Point` is Infinity
* `pointToBN(Point)` - Converts type `Point` to a `BN` instance
* `decompressPoint(BN)` - Converts `BN` to type `Point`
* `concatPoint(x: BN, y: BN)` - Concatenates two `BN` instances into type `Point`
* `hashMsgSHA256(string)` - Hashes `string` with SHA256
### Arithmetic for Elliptic Curves
* `addMod(x: BN, y: BN)` - addMod computes `z = (x + y) % p`
* `subMod(x: BN, y: BN)` - subMod computes `z = (x - y) % p`
* `mulMod(x: BN, y: BN)` - mulMod computes `z = (x * y) % p`
* `expMod(x: BN, y: BN)` - expMod computes `z = (x^^y) % p`
### Efficient Implementations of Elliptic Curves
* `pointAdd(Point1, Point2)` - Computes the sum of two points on the elliptic curve.

* `pointDouble(Point)` - If two points are coincident, Computes point doubling of the point on the elliptic curve.
* `pointMul(k: BN, Point)` - multiplies a `point` by the scalar `k`
### Digital Signatures
* `signMsg(msg, privateKey, k?)` - Returns a `signature` from a message `msg`, with the corresponding `PrivateKey` (Precomputed `k` is optional)
* `verifyMsg(msg, signature, publicKey)` - Returns `True` or `False` if the signature is valied corresponding to the `publicKey` and `msg`
### Key generation 
* `generatePrivateKey()` - Generates a `BN` instance of a random 32 byte size private Key.
* `generatePublicKey(privateKey: BN)` - Generates a `BN` instance of a public key from `privateKey`

**NOTE**: Generate a key pair by initializing `new KeySet(curve)`

#### example
```typescript 
// Generate key pair
const keySet = new KeySet(secp256k1);
const { privateKey, publicKey } = keySet;
```


## Supported Curves
* `Secp256k1`

**More under development**
## 3rd party libaries used
## [bn.js](https://github.com/indutny/bn.js)
## [jest](https://github.com/facebook/jest)
## [hash.js](https://github.com/indutny/hash.js)
# [Back to the top](#ec-crypto)
