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
    const url = props.imgUrl;
    const receiver = props.receiver;
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
            <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
            <p>
                Simply add your asset's link, name, and description, then press "Mint."
            </p>
            <form>
                <h2>🤔 Name: </h2>
                <input
                    type="text"
                    placeholder="e.g. My first NFT!"
                    onChange={(event) => setName(event.target.value)}
                />
                <h2>✍️ Description: </h2>
                <input
                    type="text"
                    placeholder="e.g. Even cooler than cryptokitties ;)"
                    onChange={(event) => setDescription(event.target.value)}
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
