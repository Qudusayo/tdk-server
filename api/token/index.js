const express = require("express");
const router = express.Router();

const balance = require("./balance");
const allowance = require("./allowance");
const transaction = require("./transaction");
const getTokenMetadata = require("./gettokenmetadata");

router.use("/balance", balance);
router.use("/allowance", allowance);
router.use("/gettokenmetadata", getTokenMetadata);
router.use("/transaction", transaction);

module.exports = router;
