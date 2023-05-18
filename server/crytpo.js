const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");

const hashMessage = (message) => keccak256(Uint8Array.from(message));

function signatureToPubKey(msg, signature) {
    const hash = hashMessage(msg);
    const fullSignature = hexToBytes(signature);
    const recoverBit = fullSignature[0];
    const signatureBytes = fullSignature.slice(1);
    return secp.recoverPublicKey(hash, signatureBytes, recoverBit);
}

const pubKeyToAddress = (pubKey) => {
    const hash = keccak256(pubKey.slice(1));
    return toHex(hash.slice(-20)).toUpperCase();
};

module.exports = {
    hashMessage,
    pubKeyToAddress,
    signatureToPubKey,
};
