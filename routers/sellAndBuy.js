const e = require("express");
const express = require("express");
const res = require("express/lib/response");
const { router } = require("../app");
const SellBuy = require("../mongoose/models/sellBuy");

const sellAndBuyRouter = new express.Router();

// ROUTES
sellAndBuyRouter.get("/sellProduct", async (req, res) => {
  let productType = req.query.product;
  let sortBy = req.query.sortBy;
  if (productType) {
    await SellBuy.find({ productName: productType }, (err, SellBuy) => {
      if (err) {
        res.status(400);
      }
      res.status(200).json(SellBuy);
    });
  } else if (sortBy) {
    if (sortBy === "lowerCostPrice") {
      SellBuy.find({})
        .sort({ costPrice: 1 })
        .exec((err, SellBuy) => {
          if (err) {
            res.status(400);
          }
          res.status(200);
          res.json(SellBuy);
        });
    } else if (sortBy === "higherCostPrice") {
      SellBuy.find({})
        .sort({ costPrice: -1 })
        .exec((err, SellBuy) => {
          if (err) {
            res.status(400);
          }
          res.status(200);
          res.json(SellBuy);
        });
    } else if (sortBy === "lowerSoldPrice") {
      SellBuy.find({})
        .sort({ soldPrice: 1 })
        .exec((err, SellBuy) => {
          if (err) {
            res.status(400);
          }
          res.status(200);
          res.json(SellBuy);
        });
    } else if (sortBy === "higherSoldPrice") {
      SellBuy.find({})
        .sort({ soldPrice: -1 })
        .exec((err, SellBuy) => {
          if (err) {
            res.status(400);
          }
          res.status(200);
          res.json(SellBuy);
        });
    }
  } else {
    SellBuy.find({}, (err, SellBuy) => {
      if (err) {
        res.status(400);
      }
      res.status(200);
      res.json(SellBuy);
    });
  }
});

sellAndBuyRouter.post("/sellProduct", async (req, res) => {
  let productName = req.body.productName;
  let costPrice = req.body.costPrice;
  let soldPrice = req.body.soldPrice;
  if (productName.length < 4) {
    res.status(400).send("product name should have minimum of four characters");
  } else if (costPrice <= 0) {
    res.status(400).send("cost price value cannot be zero or negative value");
  } else {
    const product = new SellBuy({ productName, costPrice, soldPrice });
    await product.save((err, SellBuy) => {
      if (err) {
        res.status(400);
      }
      res.status(201).json(product);
    });
  }
});

sellAndBuyRouter.patch("/sellProduct:id", async (req, res) => {
  SellBuy.findOne({ _id: req.params.id.substring(1) }, (err, result) => {
    if (err) {
      res.status(400);
    }
    if (req.body.soldPrice && req.body.soldPrice <= 0) {
      res
        .status(400)
        .json({ message: "sold price value cannot be zero or negative value" });
    } else {
      await SellBuy.findOneAndUpdate(
        { _id: req.params.id.substring(1) },
        req.body,
        { new: true },
        (err, product) => {
          if (err) {
            res.status(400);
          }
          res.status(200).json(product);
        }
      );
    }
  });
});

sellAndBuyRouter.delete("/sellProduct:id", async (req, res) => {
  await SellBuy.deleteOne({ _id: req.params.id.substring(1) }, (err, SellBuy) => {
    if (err) {
      res.status(400);
    }
    res.status(200).json({ message: "Deleted Successfully" });
  });
});

module.exports = sellAndBuyRouter;
