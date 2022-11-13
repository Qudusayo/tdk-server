const axios = require("axios");
const express = require("express");
const networkApi = require("../../middleware/network-api");

const router = express.Router();

router.get("/hash", networkApi, async (req, res) => {
  let { transaction_hash } = req.query;
  let network = req.network;

  let response = (
    await axios.post(
      `https://api${
        network && "." + network
      }.trongrid.io/wallet/gettransactionbyid`,
      {
        value: transaction_hash,
      }
    )
  ).data;

  res.status(200).json({ transactions: response });
});

router.get("/", networkApi, async (req, res) => {
  let { address, limit } = req.query;
  let network = req.network;

  let response = (
    await axios.get(
      `https://api${
        network && "." + network
      }.trongrid.io/v1/accounts/${address}/transactions?limit=${
        limit || 100
      }`
    )
  ).data;

  res.status(200).json({ transactions: response });
});

module.exports = router;