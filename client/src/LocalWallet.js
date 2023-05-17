import * as secp from "ethereum-cryptography/secp256k1.js";
import { utf8ToBytes, hexToBytes, toHex } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

const DETAILS = new Map([
    [
        "hari",
        {
            private: "a664dfc6389512eccf1704d941309d02c019a204e4337dc6eaa324858215e428",
            public: "045e35b116bfebbfb3ca5fc992e3b4ead446bf00bd25344ab44f6c05c611b8b2ab11afcf3b7dc62ed73d7fb648356589878ac5edf7c653e3d7469bd6371b1f1650",
        },
    ],
    [
        "priya",
        {
            private: "ebb59694694e235e3fc711105d7cae50548e18b0b2828181d9cd923f8915ab73",
            public: "040b14ee893aeb8e711d9c3b0b01fd91d48121001f2079b3ac250d5f6737ed70a866edeaf86c10a5c551355547a0ebe94aed61c8554082e087425bc935cce3305d",
        },
    ],
    [
        "pooja",
        {
            private: "c7ffaacb5b35d9e2647de28297f36bd35d87f63d0fda9998d12096b7de5596b5",
            public: "040a695b21c7f958f2d29393199954af191fceea60ea5420e429a245d7b29a185ca40864693efc4efb789acd7d9674b1ae05d812dc9e1f9b23c8813acdb3f7b792",
        },
    ],
]);

const USERS = Array.from(DETAILS.keys());

function getPublicKey(user) {
    if (!USERS.includes(user)) return null;
    return hexToBytes(DETAILS.get(user).public);
}

function getPrivateKey(user) {
    if (!USERS.includes(user)) return null;
    return hexToBytes(DETAILS.get(user).private);
}

function hashMessage(msg) {
    return keccak256(utf8ToBytes(msg));
}

const signmessage = async (user, msg) => {
    let hash = hashMessage(msg);
    let [signature, recoveryBit] = await secp.sign(hash, getPrivateKey(user), {
        recovered: true,
    });
    return [signature, recoveryBit];
};

async function signAndVerfiy(user, msg) {
    let [tx, rc] = await signmessage(user, msg);
    const isSigned = secp.verify(tx, hashMessage(msg), getPublicKey(user));
    console.log(isSigned);
}

const getAddress = (user) => {
    if (!user || !USERS.includes(user)) return null;
    const pubKey = getPublicKey(user);
    const hash = keccak256(pubKey.slice(1));
    return toHex(hash.slice(-20)).toUpperCase();
};

console.log(getAddress("pooja"));
