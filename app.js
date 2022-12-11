require("./db/db_connect");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


app.use(express.json());
app.use(cors());


const registerUserRouter = require("./routes/user_registration");
app.use("/user-register", registerUserRouter);

const loginUserRouter = require("./routes/user_login");
app.use("/user-login", loginUserRouter);


module.exports = app;