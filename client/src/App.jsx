import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState("");
    const [selectedVal, setSelectedVal] = useState("");

    return (
        <div className="app container-fluid">
            <div className="row justify-content-between">
                <Wallet
                    balance={balance}
                    setBalance={setBalance}
                    setSelectedVal={setSelectedVal}
                    address={address}
                    setAddress={setAddress}
                />
                <Transfer setBalance={setBalance} address={address} selectedVal={selectedVal} />
            </div>
        </div>
    );
}

export default App;
