const express = require("express");
const authRouter = require("./Routers/authRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routers/Payment");
const productRouter = require("./Routers/productRouter");

app.use(cookieParser());

app.use(cors({
  origin: ["https://yugansproduct.in", "https://www.yugansproduct.in"],
  withCredentials: true
}));

app.use("/api/payment", router);
app.use("/auth", authRouter);
app.use("/product", productRouter);

module.exports = app;