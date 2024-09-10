const { connect, KeyPair, keyStores } = require('near-api-js');
const homedir = require("os").homedir();
const path = require("path");

const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const myKeyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://testnet.nearblocks.io",
};

async function add_eth_key() {
    const near = await connect(connectionConfig);
    const account = await near.account("account-with-eth-key.testnet");

    const newKeyPair = KeyPair.fromRandom('secp256k1');
    const publicKey = newKeyPair.getPublicKey().toString();
    const privateKey = newKeyPair.toString();

    await account.addKey(publicKey);

    console.log("Public key:", publicKey);
    console.log("Private key:", privateKey);
}

add_eth_key();
