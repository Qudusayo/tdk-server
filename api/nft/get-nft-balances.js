const express = require("express");
const axios = require("axios");
const tronwebMiddleware = require("../../middleware/tronweb-middleware");

const router = express.Router();

router.get("/", tronwebMiddleware, async (req, res) => {
  let { address, contractAddress } = req.query;
  const tronWeb = req.tronWeb;

  const contractNFTHolding = await trc721_balanceOf(
    address,
    contractAddress,
    tronWeb
  );

  res.status(200).json({
    result: contractNFTHolding,
  });
});

module.exports = router;

async function trc721_balanceOf(address, contractAddress, tronWeb) {
  let tokenURIs = [];

  try {
    let contract = await tronWeb.contract().at(contractAddress);
    let result = await contract.balanceOf(address).call();
    let count = tronWeb.toDecimal(result);

    for (let index = 0; index < count; index++) {
      let token_id = await contract
        .tokenOfOwnerByIndex(
          address, // address owner
          index //uint256 index
        )
        .call();

      let tokenURIForIndex = await contract
        .tokenURI(
          tronWeb.toDecimal(token_id) //uint256 tokenid
        )
        .call();

      tokenURIs.push({
        id: index,
        token_uri: tokenURIForIndex,
      });
    }

    return tokenURIs;
  } catch (error) {
    return error;
  }
}
