const express = require("express");
const authRouter = require("./Routers/authRouter");
const app = express();
app.use(express.json());
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/auth", authRouter);

module.exports = app;