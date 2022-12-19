const express = require("express");
const router = express.Router();
const Products = require("../models/product");
const validateToken = require("../middlewares/validate_token");
const api_response = require("../utils/api_response");

router.get("/", validateToken, async (req, res) => {
    try {
        const productsList = await Products.find({}, {title: 1, price: 1});
        return res.status(200).send(api_response("Products fetched successfully", productsList))
    } catch (err) {
        return res.status(400).send(api_response("Could not fetch products", err))
    }
});

module.exports = router;
