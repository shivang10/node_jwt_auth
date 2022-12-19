const dbHandler = require('../db_tests/db_setup');
const app = require("../../app");
const request = require("supertest");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("User registration", () => {
    it("should successfully create user", async () => {
        const userData = {
            "email": "user@email.com", "password": "password", "username": "username"
        }

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(200);
        expect(resData.message).toEqual("Account is successfully created");
    });

    it("email missing, should give an error", async () => {
        const userData = {
            "password": "password", "username": "username"
        }

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email,password and username, all fields are required.");
    });

    it("password missing, should give an error", async () => {
        const userData = {
            "email": "user@email.com", "username": "username"
        }

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email,password and username, all fields are required.");
    });

    it("username missing, should give an error", async () => {
        const userData = {
            "email": "user@email.com", "password": "password",
        }

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email,password and username, all fields are required.");
    });

    it("invalid email, should give an error", async () => {
        const userData = {
            "email": "user@email", "password": "password", "username": "username"
        }

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Incorrect email.");
    });
});