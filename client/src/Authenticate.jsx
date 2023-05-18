import ReactDom from "react-dom";

export default function Authenticate({ setModalState, authVal, setAuthVal }) {
    return ReactDom.createPortal(
        <div className="modal fade">
            <label htmlFor="passwordval">Please enter your password</label>
            <input type="password" id="passwordval" className="form-control"></input>
            <button type="submit" className="btn btn-primary w-75 p-3" onClick={() => setModalState(false)}>
                Submit
            </button>
        </div>,
        document.getElementById("root")
    );
}
