const Auth = require("../Model/authModel");
const jwt = require("jsonwebtoken");

const auth = {
    isAuthenticated: async (req, res, next) => {
        try {
            const token = req.cookies?.Token;

            if (!token) {
                return res.status(401).json({ Message: "No token provided!" })
            }

            const isvalidToken = jwt.verify(token, process.env.JWT_SECRET)

            if (!isvalidToken) {
                return res.status(500).json({ Message: "The token expired and invalid!" });
            }

            req.userID = isvalidToken.id;

            next();
        }
        catch (error) {
            return res.status(500).json({ Message: "Error found on Token!!" });
        }
    }
}


module.exports = auth;