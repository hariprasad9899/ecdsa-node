import ReactDom from "react-dom";
import { Modal, Button } from "react-bootstrap";

export default function Authenticate({ isShow, invokeModal, setPasswordVal, passwordVal, validate }) {
    return (
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
    );
}
