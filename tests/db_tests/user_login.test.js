const dbHandler = require('./db_setup');
const app = require("../../app");
const request = require("supertest");
const User = require("../../models/user");
const saltRounds = 10;
const bcrypt = require("bcryptjs");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("User Login", () => {
    it("should successfully login user", async () => {
        const password = await bcrypt.hash("password", saltRounds);
        const user = new User({
            "email": "test@email.com", "password": password, "username": "username"
        });

        await user.save();

        const userData = {
            "email": "test@email.com", "password": "password", "username": "username"
        }

        const res = await request(app).post("/user-login").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(200);
        expect(resData.message).toEqual("Successfully logged in");
    });

    it("should give error for wrong username", async () => {
        const password = await bcrypt.hash("password", saltRounds);
        const user = new User({
            "email": "test@email.com", "password": password, "username": "username"
        });

        await user.save();

        const userData = {
            "email": "testing@email.com", "password": "password", "username": "username"
        }

        const res = await request(app).post("/user-login").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Wrong username or password. Try Again");
    });

    it("should give error for wrong password", async () => {
        const password = await bcrypt.hash("password", saltRounds);
        const user = new User({
            "email": "test@email.com", "password": password, "username": "username"
        });

        await user.save();

        const userData = {
            "email": "test@email.com", "password": "passwords", "username": "username"
        }

        const res = await request(app).post("/user-login").send(userData);
        const resData = JSON.parse(res["text"]);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Wrong username or password. Try Again");
    });

    it("email missing, should give an error", async () => {
        const userData = {
            "password": "password", "username": "username"
        }

        const res = await request(app).post("/user-login").send(userData);
        expect(res.status).toEqual(400);
        expect(res.text).toEqual("Email and password both are required.");
    });

    it("password missing, should give an error", async () => {
        const userData = {
            "email": "user@email.com", "username": "username"
        }

        const res = await request(app).post("/user-login").send(userData);
        expect(res.status).toEqual(400);
        expect(res.text).toEqual("Email and password both are required.");
    });
});
