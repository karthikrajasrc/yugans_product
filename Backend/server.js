const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database Connected..")
        app.listen(4000, "127.0.0.1", () => {
            console.log("The server is live now.. http://127.0.0.1:4000");
        })
    })
    .catch((error) => {
        console.log("Error in database connection..", error.message);
    })