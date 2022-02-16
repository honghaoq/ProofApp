import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";

import {
  getPayments
} from "./util/txns.js";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [dict, setTransaction] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [receiver, setReceiver] = useState("");
  const url = "https://gateway.pinata.cloud/ipfs/QmfQvb7QQG5DE6m8tFURE5Uuhu7dRU7TEaxRcSutmEPmQe";

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(url, name, description, receiver);
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setReceiver("");
    }
  };

  const walletAddr = '0x12bd9048b419838e25046040dcd297ab16850280';
  useEffect(async () => {
    const txns = await getPayments(walletAddr, '0x41532c0decc835293dd1e3edd47eb5eb7a7677cf');
    setTransaction(txns);
  }, []);

  const Txns = (props) => {
    const myString = JSON.stringify(dict);
    console.log(myString);

    // const myString = dict.replaceAt(0, "'") +
    //   // console.log(dict["result"]["transfers"])
    //   console.log(myString);
    // try {
    // const results = JSON.parse(dict);
    // }
    // catch (e) {
    //   alert(e); // error in the above string (in this case, yes)!
    // }
    // const results = JSON.parse('{"id": 0, "result": {"transfers": [{"blockNum": "0xd2a6e0", "hash": "0x189ef9fa05061537b8e1898cc7c8c83b321be81c9af5d3c82010ea17d8173baa", "from": "0x12bd9048b419838e25046040dcd297ab16850280", "to": "0x41532c0decc835293dd1e3edd47eb5eb7a7677cf", "value": 565.5534448005341, "erc721TokenId": null, "erc1155Metadata": null, "tokenId": null, "asset": "BANK", "category": "token", "rawContract": {"value": "0x1ea8a1759d9251b180", "address": "0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198", "decimal": "0x12"}}, {"blockNum": "0xd616e3", "hash": "0xa9ed45ccb95a3b31e7258b748e4d75bab9711cff9ce07eedf4ecadc50356f6b5", "from": "0x12bd9048b419838e25046040dcd297ab16850280", "to": "0x41532c0decc835293dd1e3edd47eb5eb7a7677cf", "value": 188.1000391, "erc721TokenId": null, "erc1155Metadata": null, "tokenId": null, "asset": "BANK", "category": "token", "rawContract": {"value": "0x0a326994f6f8965800", "address": "0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198", "decimal": "0x12"}}]}, "jsonrpc": "2.0"}');
    return (
      <div>
        Aha
      </div>
    )
    // const results = JSON.parse(dict);
    // const transactions = results["result"]["transfers"];
    // return (
    //   <div className="Txns">
    //     {transactions.map(transaction => {
    //       <div class="w3-card-4">
    //         <p> {transaction['value']} {transaction['asset']}</p>
    //         <p> {transaction['hash']}</p>
    //       </div>
    //     })}
    //   </div>
    // )
  }

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <br></br>
      <h1 id="title">🅿️ Get My Proof</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint. for all of your"
      </p>
      <button id="txnButton" onClick={onMintPressed}>
        See transactions
      </button>
      <div>
        <Txns></Txns>
      </div>
      <div class="swiper"></div>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Minter;
