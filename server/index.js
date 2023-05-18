const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("./crytpo");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
    F1F0499926D9B9A8B7B1CAF938C8EC1E93F56DF2: 100,
    D609349F29CB6821C88061E42AC1D6EA97EE0820: 50,
    "8001653568EC653FEEB27F234D4B81C59EDBC41B": 75,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post("/send", async (req, res) => {
    const { msg, signature } = req.body;
    const { recipient, amount } = msg;

    const pubKey = crypto.signatureToPubKey(msg, signature);
    const sender = crypto.pubKeyToAddress(pubKey);

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
    } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
