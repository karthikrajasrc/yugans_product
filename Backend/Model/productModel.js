const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    price: String,
    description: String,
    image: String,
    grams: String,
})

module.exports = mongoose.model("Product", productSchema, "Products");