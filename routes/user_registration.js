const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const saltRounds = 10;

router.route("/").post(async (req, res) => {
    const {username, password: plainTextPassword, email} = req.body;

    if (!email || !plainTextPassword || !username) {
        return res.status(200).send("Email,password and username, all fields are required.");
    }

    if (!emailValidator.validate(email)) {
        return res.status(200).send("Incorrect email.")
    }

    const password = await bcrypt.hash(plainTextPassword, saltRounds);
    try {
        const userResponse = await User.create({
            username,
            password,
            email
        });

        return res.status(200).send({
            message: "Account is successfully created",
            response: userResponse,
        })
    } catch (err) {
        return res.status(400).send({
            message: "error came up",
            response: err
        })
    }

})

module.exports = router;