const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
})

module.exports = mongoose.model("Auth", authSchema, "Users");