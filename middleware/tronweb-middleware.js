const tronWeb = require("../config/tronWeb");

module.exports = function tronWebMiddleware(req, res, next) {
  const networkHeader = req.headers["network"];

  if (["nile", "shasta"].includes(networkHeader?.toLowerCase())) {
    req.tronWeb = tronWeb[networkHeader?.toLowerCase()]();
  } else {
    req.tronWeb = tronWeb["mainnet"]();
  }
  next();
};
