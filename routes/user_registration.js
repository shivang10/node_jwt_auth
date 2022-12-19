const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const api_response = require("../utils/api_response");
const saltRounds = 10;

router.route("/").post(async (req, res) => {
    const {username, password: plainTextPassword, email} = req.body;

    if (!email || !plainTextPassword || !username) {
        return res.status(400).send(api_response("Email,password and username, all fields are required."));
    }

    if (!emailValidator.validate(email)) {
        return res.status(400).send(api_response("Incorrect email."));
    }

    const password = await bcrypt.hash(plainTextPassword, saltRounds);
    try {
        const userResponse = await User.create({
            username, password, email
        });

        return res.status(200).send(api_response("Account is successfully created", userResponse))
    } catch (err) {
        return res.status(400).send(api_response("Some error came up", err))
    }

})

module.exports = router;