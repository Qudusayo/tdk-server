const express = require("express");
const axios = require("axios");
const tronwebMiddleware = require("../../middleware/tronweb-middleware");

const router = express.Router();

router.get("/", tronwebMiddleware, async (req, res) => {
  let { address: contractAddress, token_id } = req.query;
  const tronWeb = req.tronWeb;

  let contract = await tronWeb.contract().at(contractAddress);

  let tokenURIForIndex = await contract
    .tokenURI(tronWeb.toDecimal(token_id))
    .call();
  let metadata;

  try {
    metadata = (await axios.get(tokenURIForIndex)).data;
  } catch (error) {
    metadata = {};
  }

  res.status(200).json({
    address: contractAddress,
    token_id,
    token_uri: tokenURIForIndex,
    metadata,
  });
});

module.exports = router;
