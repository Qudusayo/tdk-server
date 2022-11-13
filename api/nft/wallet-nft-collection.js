const axios = require("axios");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { address } = req.query;

    let response = (
      await axios.get(
        `https://apilist.tronscan.org/api/account?address=${address}`
      )
    ).data;

    const moderatedFilter = response.trc721token_balances.map(
      (trc721token_balances) => {
        return {
          tokenId: trc721token_balances.tokenId,
          tokenName: trc721token_balances.tokenName,
          tokenAbbr: trc721token_balances.tokenAbbr,
          tokenType: trc721token_balances.tokenType,
        };
      }
    );

    res
      .status(200)
      .json({ total: moderatedFilter.length, result: moderatedFilter });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
