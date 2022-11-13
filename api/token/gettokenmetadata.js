const express = require("express");
const tronwebMiddleware = require("../../middleware/tronweb-middleware");

const router = express.Router();

router.get("/", tronwebMiddleware, async (req, res) => {
  try {
    let { address } = req.query;
    const tronWeb = req.tronWeb;

    let result = await tronWeb.trx.getTokenByID(address);

    res.status(200).json({ ...result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
