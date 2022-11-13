require("dotenv").config();

module.exports = function networkApi(req, res, next) {
  const networkHeader = req.headers["network"];

  if (["nile", "shasta"].includes(networkHeader?.toLowerCase())) {
    req.network = networkHeader.toLowerCase();
  } else {
    req.network = "";
  }
  next();
};
