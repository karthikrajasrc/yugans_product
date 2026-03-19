const Auth = require("../Model/authModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    registerUser: async (req, res) => {
        try {
            const { Name, Email, Password } = req.body;
            
            if (Name === "" || Email === "" || Password === "") {
                return res.status(400).json({Message: "Please Fill required Fields!"})
            }

            const alreadyRegister = await Auth.findOne({ Email });

            if (alreadyRegister) {
                return res.status(400).json({Message: "Account Already Exists!! Please Login!"})
            }

            const hasedPassword = await bcrypt.hash(Password, 10);

            const newUser = new Auth({
                Name, Email, Password: hasedPassword
            })

            const userRole = await Auth.find();

            if (userRole.length == 0) {
                newUser.Role = "Admin";
            }

            const saveduser = await newUser.save();

            return res.status(200).json({ Message: "Account Regsitered Succesfully !", User: saveduser });

        }
        catch (error) {
            return res.status(500).json({ Message: "Registration Failed!", Error: error.Message });
        }
    }, 
    loginUser: async (req, res) => {
        try {
            const { Email, Password } = req.body;

            const loggedUser = await Auth.findOne({ Email });

            console.log(loggedUser);

            if (!loggedUser) {
                return res.status(404).json({ Message: "No Account Found!! Please Signup" });
            }

            const isPasswordvalid = await bcrypt.compare(Password, loggedUser.Password);

            if (!isPasswordvalid) {
                return res.status(401).json({ Message: "Password Incorrect" });
            }

            const token = await jwt.sign({ id: loggedUser._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

            res.cookie("Token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict"
            });

            return res.status(200).json({ Message: "Login Successfull!", user: loggedUser});

        }
        catch(error) {
             return res.status(400).json({ Message: `Error found on Login!! ${error.message}` });
        }
    },
    googleUser: async (req, res) => {
    try {
        const { Name, Email } = req.body;

        const alreadyRegister = await Auth.findOne({ Email });

        if (alreadyRegister) {
            const token = jwt.sign(
                { id: alreadyRegister._id },
                process.env.JWT_SECRET,
                { expiresIn: "3h" }
            );

            res.cookie("Token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict"
            });

            return res.status(200).json({
                Message: "Login Successful!",
                user: alreadyRegister
            });
        }

        const newUser = new Auth({ Name, Email });

        const userRole = await Auth.find();
        if (userRole.length === 0) {
            newUser.Role = "Admin";
        }

        const saveduser = await newUser.save();

        const token = jwt.sign(
            { id: saveduser._id },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.cookie("Token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        });

        return res.status(200).json({
            Message: "Account Registered & Login Successful!",
            user: saveduser
        });

    } catch (error) {
        return res.status(500).json({
            Message: `Registration Failed! , ${error.message}`
        });
    }
},
    me: async (req, res) => {
        try {
            const userid = req.userID;
            
            const user = await Auth.findById(userid);

            return res.status(200).json({ user: user });

        }
        catch (error) {
            return res.status(500).json({ Message: "Error found on Login!!" });
        }
    }, logout: async (req, res) => {
        try {
            // clear the cookie from the browser
            res.clearCookie('Token');

            return res.status(200).json({ message: 'logout successful' });
        } catch (error) {
            return res.status(500).json({ message: `logout failed: ${error.message}` });
        }
    }
}

module.exports = authController;