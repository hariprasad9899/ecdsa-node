import { useState } from "react";
import server from "./server";
import LocalWallet from "./LocalWallet";
import Authenticate from "./Authenticate";
import { Modal, Button } from "react-bootstrap";

function Transfer({ address, setBalance, selectedVal }) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [isShow, invokeModal] = useState(false);
    const [passwordVal, setPasswordVal] = useState("");
    const [access, setAccess] = useState(false);

    const initModal = () => {
        return invokeModal(!false);
    };

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function validate(p) {
        let result = LocalWallet.passwordValidate(selectedVal, p);
        console.log(result);
        if (result) {
            setAccess(true);
            invokeModal(false);
            setPasswordVal("");
            await transactionConfirmed();
        } else {
            setAccess(false);
            invokeModal(false);
            setPasswordVal("");
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
        } catch (ex) {
            alert(ex.response.data.message);
        }
        setAccess(false);
    }

    async function transfer(evt) {
        evt.preventDefault();
        await completeAuth();
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

            {/* {modalState ? (
                <Authenticate setModalState={setModalState} authVal={authVal} setAuthVal={setAuthVal} />
            ) : null} */}

            <Modal show={isShow}>
                <Modal.Header closeButton onClick={() => invokeModal(false)}>
                    <Modal.Title>Please enter your password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="password"
                        className="form-control"
                        value={passwordVal}
                        onChange={(e) => setPasswordVal(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => invokeModal(false)}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={() => validate(passwordVal)}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </form>
    );
}

export default Transfer;
