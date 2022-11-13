require("dotenv").config();
const TronWeb = require("tronweb");

const HttpProvider = TronWeb.providers.HttpProvider;
const tronWeb = {
  nile: function () {
    const fullNode = new HttpProvider(process.env.NILE_URI);
    const solidityNode = new HttpProvider(process.env.NILE_URI);
    const eventServer = new HttpProvider(process.env.NILE_URI);
    const privateKey = process.env.PRIVATE_KEY;

    return new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  },
  shasta: function () {
    const fullNode = new HttpProvider(process.env.SHASTA_URI);
    const solidityNode = new HttpProvider(process.env.SHASTA_URI);
    const eventServer = new HttpProvider(process.env.SHASTA_URI);
    const privateKey = process.env.PRIVATE_KEY;

    return new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  },
  mainnet: function () {
    const fullNode = new HttpProvider(process.env.MAINNET_URI);
    const solidityNode = new HttpProvider(process.env.MAINNET_URI);
    const eventServer = new HttpProvider(process.env.MAINNET_URI);
    const privateKey = process.env.PRIVATE_KEY;

    return new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  },
};

module.exports = tronWeb;
