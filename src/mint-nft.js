// const hre = require("hardhat");
import { pinJSONToIPFS } from './utils/pinata.js';
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY; // Myself
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

console.log(PUBLIC_KEY);

export const mintNewNFT = async (recipientAddr, name, url) => {
    const metadata = new Object();
    metadata.image = url;
    metadata.name = name;
    metadata.description = description;

    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    }
    const tokenURI = pinataResponse.pinataUrl;

    const NFT = await ethers.getContractFactory("ProofBadge");
    // NFT Contract Address
    var NFTContractAddr = "0xfBB4044444E8ab9bc411E04b947fa5322470e8df";
    const contract = NFT.attach(NFTContractAddr);
    await contract.mint(recipientAddr, tokenURI);
    console.log("NFT minted:", tokenURI);
}

// Original func
// async function mintNFT(recipientAddr, tokenURI) {
//     const NFT = await hre.ethers.getContractFactory("ProofBadge");
//     // NFT Contract Address
//     var NFTContractAddr = "0xfBB4044444E8ab9bc411E04b947fa5322470e8df";
//     const contract = NFT.attach(NFTContractAddr);
//     await contract.mint(recipientAddr, tokenURI);
//     console.log("NFT minted:", tokenURI);
// }


// Example usage
pintanaURL = "ipfs://QmfQvb7QQG5DE6m8tFURE5Uuhu7dRU7TEaxRcSutmEPmQe";

// Testing with my own address
mintNFT(PUBLIC_KEY, pintanaURL).then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});