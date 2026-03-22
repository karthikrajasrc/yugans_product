const express = require("express");
const productRouter = express.Router();
const upload = require("../Middlewares/multer.js");
const Product = require("../Model/productModel.js");

productRouter.post("/add", upload.single("image"), async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { productName, price, description, grams } = req.body || {};

        const imageUrl = req.file ? req.file.path : ""; 

        const newProduct = new Product({
            productName,
            price: Number(price),
            description,
            grams: Number(grams),
            image: imageUrl
        });

        await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
            newProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error adding product, ${error}` });
    }   
});

productRouter.get("/all", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error fetching products, ${error}` });
    }
});

productRouter.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error fetching products, ${error}` });
    }
});

productRouter.put("/update/:id", upload.single("image"), async (req, res) => {
    try {

        const { id } = req.params;

       console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const updateProduct = await Product.findById(id);

        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const { productName, price, description, grams } = req.body || {};

        const imageUrl = req.file ? req.file.path : updateProduct.image; 

        const newProduct = updateProduct.set({
            productName: productName || updateProduct.productName,
            price: Number(price) || Number(updateProduct.price),
            description: description || updateProduct.description,
            grams: Number(grams) || Number(updateProduct.grams),
            image: imageUrl,
        });

        await newProduct.save();

       res.status(200).json({
    message: "Product updated successfully",
    updateProduct: newProduct
});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error fetching products, ${error}` });
    }
});


module.exports = productRouter;