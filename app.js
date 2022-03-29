const express = require("express");
const sellAndBuyRouter = require("./routers/sellAndBuy");
const bodyParser = require("body-parser");
require("./mongoose/connect_db/mongoose");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(sellAndBuyRouter);

module.exports = app;
