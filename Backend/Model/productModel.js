const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    description: String,
    image: String,
    grams: Number,
})

module.exports = mongoose.model("Product", productSchema, "Products");