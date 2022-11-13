const axios = require("axios");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  let { address, type } = req.query;

  let response = (
    await axios.get(
      `https://apilist.tronscan.org/api/account?address=${address}`
    )
  ).data;

  let tokenBalances;
  switch (type) {
    case "trc10":
      tokenBalances = response.balances;
      break;
    case "trc20":
      tokenBalances = response.trc20token_balances;
      break;
    default:
      tokenBalances = response.balances.concat(response.trc20token_balances);
      break;
  }

  const moderatedFilter = tokenBalances.map((tokenBalance) => {
    return {
      tokenId: tokenBalance.tokenId,
      tokenName: tokenBalance.tokenName,
      tokenAbbr: tokenBalance.tokenAbbr,
      tokenLogo: tokenBalance.tokenLogo,
      balance: tokenBalance.balance,
      tokenDecimal: tokenBalance.tokenDecimal,
      tokenType: tokenBalance.tokenType,
    };
  });

  res.status(200).json({ total: moderatedFilter.length, result: moderatedFilter });
});

module.exports = router;
