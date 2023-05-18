import { useState } from "react";
import server from "./server";
import LocalWallet from "./LocalWallet";

function Transfer({ address, setBalance, selectedVal }) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();
        const msg = {
            recipient,
            amount: parseInt(sendAmount),
        };
        const signature = await LocalWallet.signmessage(selectedVal, msg);
        const transaction = {
            msg,
            signature,
        };

        try {
            const {
                data: { balance },
            } = await server.post(`send`, transaction);
            setBalance(balance);
        } catch (ex) {
            alert(ex.response.data.message);
        }
    }

    return (
        <form className="col-md-6 transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label className="form-label" htmlFor="sendAmount">
                Send Amount
            </label>
            <input
                className="form-control rounded-0 p-2"
                placeholder="1, 2, 3..."
                value={sendAmount}
                id="sendAmount"
                onChange={setValue(setSendAmount)}
            ></input>

            <label htmlFor="recipient" className="form-label mt-2">
                Recipient
            </label>
            <input
                className="form-control rounded-0 p-2"
                placeholder="Type an address, for example: 0x2"
                value={recipient}
                id="recipient"
                onChange={setValue(setRecipient)}
            ></input>

            <button type="submit" className="btn w-100 btn-primary mt-2 p-2" value="Transfer">
                TRANSFER
            </button>
        </form>
    );
}

export default Transfer;
