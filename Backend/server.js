const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database Connected..")
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error in database connection..", error.message);
    })