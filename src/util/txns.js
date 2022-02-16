const fetch = require('node-fetch');
global.fetch = fetch
global.Headers = fetch.Headers;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// Alchemy API
const APIKey = "https://eth-mainnet.alchemyapi.io/v2/N8LhHYy0HSXVNXCoe-gqHnfIEcBsguyy";

const web3 = createAlchemyWeb3(APIKey);

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const getPayments = async (DAOWallet, userWallet) => {
    var raw = JSON.stringify({
        "jsonrpc": "2.0",
        "id": 0,
        "method": "alchemy_getAssetTransfers",
        "params": [
            {
                "fromBlock": "0x1",
                "fromAddress": DAOWallet,
                "toAddress": userWallet,
                "excludeZeroValue": true,
                "category": [
                    "external",
                    "token"
                ]
            }
        ]
    });

    // tokenstream.party

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return await fetch(APIKey, requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));
}