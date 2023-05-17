import server from "./server";
import LocalWallet from "./LocalWallet";

function Wallet({ address, setAddress, balance, setBalance }) {
    async function onChange(evt) {
        const address = evt.target.value;
        setAddress(address);
        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    return (
        <div className="col-md-6 wallet">
            <h1>Your Wallet</h1>

            <label className="form-label" htmlFor="walletAddress">
                Wallet Address
            </label>
            <input
                className="form-control rounded-0 p-2"
                placeholder="Type an address, for example: 0x1"
                value={address}
                id="walletAddress"
                onChange={onChange}
            ></input>
            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
