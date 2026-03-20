const express = require("express");
const authRouter = require("./Routers/authRouter");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routers/Payment");

app.use(cookieParser());

app.use(cors({
  origin: "https://yugansproduct.netlify.app",
  credentials: true
}));

app.use("/api/payment", router);

app.use("/auth", authRouter);

module.exports = app;