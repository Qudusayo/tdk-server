const axios = require("axios");
const express = require("express");
const networkApi = require("../../middleware/network-api");

const router = express.Router();

router.get("/", networkApi, async (req, res) => {
  let { address, limit } = req.query;
  let network = req.network;

  let response = (
    await axios.get(
      `https://api${
        network && "." + network
      }.trongrid.io/v1/accounts/${address}/transactions/trc20?limit=${
        limit || 100
      }`
    )
  ).data;

  res.status(200).json({ transactions: response });
});

module.exports = router;
