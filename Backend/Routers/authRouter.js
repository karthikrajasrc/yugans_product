const express = require("express");
const { registerUser, loginUser, googleUser, me } = require("../Controllers/authController");
const { isAuthenticated } = require("../Middlewares/auth");
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/googlelogin", googleUser);
authRouter.post("/me", isAuthenticated, me);

module.exports = authRouter;