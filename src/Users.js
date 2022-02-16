import { useEffect, useState } from "react";
import {
    mintNFT,
} from "./util/interact.js";



const MyMinter = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    console.log(props.imgUrl);
    console.log(props.receiver);
    console.log(props.txn);
    const url = props.imgUrl;
    const receiver = props.receiver;
    const transaction = props.txn
    const onMintPressed = async () => {
        const { success, status } = await mintNFT(url, name, description, receiver);
        setStatus(status);
        if (success) {
            setName("");
            setDescription("");
        }
    };

    return (
        <div className="NewMinter">
            <br></br>
            {/* <h1 id="title">🔥 My Web3 Work Portfolio</h1> */}
            {/* <p>
                Simply add your asset's link, name, and description, then press "Mint."
            </p> */}
            <form>
                <h3> 💪 Contribution record</h3>
                <p> Transaction Id: {transaction.hash}</p>
                <p> Transaction Asset: {transaction.asset}</p>
                <p> Transaction Value: {transaction.value}</p>
                <h3>✍️ Work Description: </h3>
                <input
                    type="text"
                    placeholder="e.g. Solidity Programming! "
                    onChange={(event) => setDescription(event.target.value)}
                />
                <h3>🤔 Set NFT Name: </h3>
                <input
                    type="text"
                    placeholder="e.g. My Work NFT!"
                    onChange={(event) => setName(event.target.value)}
                />
            </form>
            <button id="mintButton" onClick={onMintPressed}>
                Mint NFT
            </button>
            <p id="status" style={{ color: "red" }}>
                {status}
            </p>
        </div>
    );
};

export default MyMinter;
