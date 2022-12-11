const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoDbUrl = process.env.MONGO_URI;

mongoose.connect(
    mongoDbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("DB connected successfully");
});