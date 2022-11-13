const express = require("express");
const tronwebMiddleware = require("../../middleware/tronweb-middleware");

const router = express.Router();

router.get("/", tronwebMiddleware, async (req, res) => {
  try {
    let { address, contractAddress, spenderAddress } = req.query;
    const tronWeb = req.tronWeb;

    let contract = await tronWeb.contract().at(contractAddress);
    let result = await contract.allowance(address, spenderAddress).call();
    let allowance = tronWeb.toDecimal(result);

    res.status(200).json({ allowance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
