require("./db/db_connect");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


app.use(express.json());
app.use(cors());


module.exports = app;