import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";

import {
  getPayments
} from "./util/txns.js";

import MyMinter from './Users';

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [dict, setTransaction] = useState({});
  const [DAOAddr, setDAOAddr] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [receiver, setReceiver] = useState("");
  const url = "https://gateway.pinata.cloud/ipfs/QmfQvb7QQG5DE6m8tFURE5Uuhu7dRU7TEaxRcSutmEPmQe"; // ProofBadge

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

  // example DAOAddr = '0x12bd9048b419838e25046040dcd297ab16850280';
  // example walletAddress = '0x41532c0decc835293dd1e3edd47eb5eb7a7677cf';
  const onTxnPressed = async () => {
    const txns = await getPayments('0x12bd9048b419838e25046040dcd297ab16850280', '0x41532c0decc835293dd1e3edd47eb5eb7a7677cf');
    console.log(txns);
    setTransaction(txns);
  }

  const Txns = (props) => {
    const myString = dict;
    console.log(typeof (myString));
    if (typeof myString == 'string') {
      const results = JSON.parse(dict);
      const transactions = results["result"]["transfers"];
      var txns = [];
      for (var i = 0; i < transactions.length; i++) {
        var transaction = transactions[i];
        txns.push(<MyMinter imgUrl={url} receiver={walletAddress} txn={transaction} />);
      }
      return (<div className="Txns">{txns}</div>);
    }
    return (
      <div className="Txns">
      </div>
    )
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
      <h1 id="title">🅿️ Proof of WORK</h1>
      <p>
        Turn your wallet into Web3 work portfolio! Get NFTs for your work!
      </p>


      <h2>✍️ Enter DAO Wallet Address: </h2>
      <p>
        Simply add your asset's link, name, and description, to mint NFTs for your work"
      </p>
      <input
        type="text"
        placeholder="e.g. 0x000"
        onChange={(event) => setDAOAddr(event.target.value)}
      />
      <button id="viewTxns" onClick={onTxnPressed}>
        Get My Proof
      </button>

      <h1 id="title">🔥 My Web3 Work Portfolio</h1>

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
