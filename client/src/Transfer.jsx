import { useState } from "react";
import server from "./server";
import LocalWallet from "./LocalWallet";
import Authenticate from "./Authenticate";
import { Modal, Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import Error from "./alerts/Error";
import Success from "./alerts/Success";
import Warning from "./alerts/Warning";

function Transfer({ address, setBalance, selectedVal }) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [isShow, invokeModal] = useState(false);
    const [passwordVal, setPasswordVal] = useState("");
    const [failAlert, setFailAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [warningAlert, setWarningAlert] = useState(false);

    const initModal = () => {
        if (recipient.length > 0 && address.length > 0 && sendAmount.length > 0) {
            return invokeModal(!false);
        } else {
            setWarningAlert(true);
            setTimeout(() => {
                setWarningAlert(false);
            }, 3000);
        }
    };

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function validate(p) {
        if (p.length < 1) {
            return;
        }
        let result = LocalWallet.passwordValidate(selectedVal, p);
        console.log(result);
        if (result) {
            invokeModal(false);
            setPasswordVal("");
            await transactionConfirmed();
        } else {
            invokeModal(false);
            setPasswordVal("");
            setFailAlert(true);
            setTimeout(() => {
                setFailAlert(false);
            }, 3000);
        }
        return validate;
    }

    async function completeAuth() {
        initModal();
    }

    async function transactionConfirmed() {
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
            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false);
            }, 3000);
        } catch (ex) {
            alert(ex.response.data.message);
        }
    }

    async function transfer(evt) {
        evt.preventDefault();
        await completeAuth();
    }

    return (
        <form className="col-md-6 transfer" onSubmit={transfer}>
            <h1 className="text-dark">Send Transaction</h1>

            <label className="form-label" htmlFor="sendAmount">
                Send Amount
            </label>
            <input
                className="form-control rounded-0 p-2"
                placeholder="1, 10, 20"
                value={sendAmount}
                id="sendAmount"
                onChange={setValue(setSendAmount)}
            ></input>

            <label htmlFor="recipient" className="form-label mt-2">
                Recipient
            </label>
            <input
                className="form-control rounded-0 p-2"
                placeholder="Type an address of recipient"
                value={recipient}
                id="recipient"
                onChange={setValue(setRecipient)}
            ></input>

            <button type="submit" className="btn w-100 btn-primary mt-3 p-2 rounded-0" value="Transfer">
                TRANSFER
            </button>

            <Authenticate
                isShow={isShow}
                invokeModal={invokeModal}
                validate={validate}
                setPasswordVal={setPasswordVal}
                passwordVal={passwordVal}
            />

            {failAlert ? ReactDOM.createPortal(<Error />, document.getElementById("root")) : null}
            {successAlert ? ReactDOM.createPortal(<Success />, document.getElementById("root")) : null}
            {warningAlert ? ReactDOM.createPortal(<Warning />, document.getElementById("root")) : null}
        </form>
    );
}

export default Transfer;
