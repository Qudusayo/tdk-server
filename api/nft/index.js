const express = require("express");
const router = express.Router();

const nftMetadata = require("./nft-metadata");
const walletNftCollection = require("./wallet-nft-collection");

router.use("/nft-metadata", nftMetadata);
router.use("/wallet-nft-collection", walletNftCollection);

module.exports = router;
