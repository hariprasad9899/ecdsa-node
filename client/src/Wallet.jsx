import server from "./server";
import LocalWallet from "./LocalWallet";

function Wallet({ address, setAddress, balance, setBalance, setSelectedVal }) {
    async function handleSelectChange(e) {
        const address = LocalWallet.getAddress(e.target.value);
        setAddress(address);
        setSelectedVal(e.target.value);
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

            <select
                className="form-select rounded-0 mb-3 p-2 mt-4"
                defaultValue="Choose the Wallet Address"
                onChange={handleSelectChange}
            >
                <option disabled>Choose the Wallet Address</option>
                {LocalWallet.USERS.map((item) => {
                    return <option key={item}>{item}</option>;
                })}
            </select>

            <label className="form-label" htmlFor="walletAddress">
                Wallet Address
            </label>
            <input
                className="form-control rounded-0 p-2"
                placeholder="Type an address, for example: 0x1"
                value={address}
                id="walletAddress"
                readOnly
            ></input>
            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
