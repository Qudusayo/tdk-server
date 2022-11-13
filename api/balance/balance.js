const express = require("express");
const tronwebMiddleware = require("../../middleware/tronweb-middleware");

const router = express.Router();

router.get("/balance", tronwebMiddleware, async (req, res) => {
  let { address } = req.query;
  const tronWeb = req.tronWeb;

  let balance = await tronWeb.trx.getBalance(address);

  res.status(200).json({ balance });
});

module.exports = router;
