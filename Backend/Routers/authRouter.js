const express = require("express");
const { registerUser, loginUser, googleUser, me, logout } = require("../Controllers/authController");
const { isAuthenticated } = require("../Middlewares/auth");
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/googlelogin", googleUser);
authRouter.post("/me", isAuthenticated, me);
authRouter.post("/logout", isAuthenticated, logout);

module.exports = authRouter;