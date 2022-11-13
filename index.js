require("dotenv").config();

const express = require("express");
const cors = require("cors");

const server = express();

//Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Routes
const nft = require("./api/nft");
const token = require("./api/token");
const nativeBalance = require("./api/balance/balance");
const transaction = require("./api/transaction/transaction");

// Get Routes
server.use("/nft", nft);
server.use("/token", token);
server.use("/native", nativeBalance);
server.use("/transaction", transaction);

server.get("/", (req, res) => {
  res.status(403).json("Access Denied");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
