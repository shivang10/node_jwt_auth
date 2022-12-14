const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const api_response = require("../utils/api_response");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send(api_response("Email and password both are required."));
    }

    try {
        const isUserValid = await User.findOne({email}, {username: 1, password: 1, email: 1});
        const isPasswordCorrect = await bcrypt.compare(password, isUserValid["password"]);
        if (isPasswordCorrect) {
            const token = jwt.sign({id: isUserValid._id, username: isUserValid.username}, JWT_SECRET, {
                expiresIn: "7d"
            });
            return res.status(200).send(api_response("Successfully logged in", token));
        } else {
            return res.status(400).send(api_response("Wrong username or password. Try Again"));
        }
    } catch (err) {
        return res.status(400).send(api_response("Wrong username or password. Try Again"));
    }
});

module.exports = router;
