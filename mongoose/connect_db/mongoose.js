const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/SellAndBuy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
