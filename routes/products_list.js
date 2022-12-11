const express = require("express");
const router = express.Router();
const Products = require("../models/product");

router.get("/", async (req, res) => {
    try {
        const productsList = await Products.find({}, {title: 1, price: 1});

        return res.status(200).send({
            message: "Products fetched successfully",
            response: productsList
        })

    } catch (err) {
        return res.status(400).send({
            message: "Could not fetch products",
            response: err
        })
    }
})

module.exports = router;
