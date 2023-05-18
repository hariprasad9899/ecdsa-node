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
            <h1 className="text-dark">Your Wallet</h1>

            <label htmlFor="selectaccount" className="form-label">
                Select Account
            </label>
            <select
                className="form-select rounded-0 mb-2 p-2"
                defaultValue="Choose the Wallet Address"
                onChange={handleSelectChange}
                id="selectaccount"
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
            <div className="w-100 p-2 mt-3 mb-3 balance" style={{ backgroundColor: "#f4f6f8" }}>
                BALANCE: {balance}
            </div>
        </div>
    );
}

export default Wallet;
