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

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(url, name, description, receiver);
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setReceiver("");
    }
  };

  // example DAOAddr = '0x12bd9048b419838e25046040dcd297ab16850280';
  // example walletAddress = '0x41532c0decc835293dd1e3edd47eb5eb7a7677cf';
  const onTxnPressed = async () => {
    const txns = await getPayments(DAOAddr, walletAddress);
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
        txns.push(<p> {transaction.value} {transaction.asset}</p>);
        txns.push(<p> {transaction.hash}</p>);
        txns.push(<form>
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
        );
        txns.push(<button id="mintButton" onClick={onMintPressed}>
          Mint NFT
        </button>);
        console.log(transaction['hash']);
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
      <h1 id="title">🅿️ Get My Proof</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint. for all of your"
      </p>
      <h2>✍️ DAO Wallet Address: </h2>
      <input
        type="text"
        placeholder="e.g. 0x000"
        onChange={(event) => setDAOAddr(event.target.value)}
      />
      <button id="viewTxns" onClick={onTxnPressed}>
        View Transactions
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
