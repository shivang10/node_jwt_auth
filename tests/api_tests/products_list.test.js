const dbHandler = require('../db_tests/db_setup');
const app = require("../../app");
const request = require("supertest");
const User = require("../../models/user");
const saltRounds = 10;
const bcrypt = require("bcryptjs");
const Product = require("../../models/product");
const fakeProducts = require("../db_tests/fake_products_data.json");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Products List test", () => {
    it("should return list of products", async () => {
        const password = await bcrypt.hash("password", saltRounds);
        const user = new User({
            "email": "test@email.com", "password": password, "username": "username"
        });

        await user.save();
        const userData = {
            "email": "test@email.com", "password": "password", "username": "username"
        }

        await Product.create(fakeProducts);

        const loginRequest = await request(app).post("/user-login").send(userData);
        const loginRequestData = JSON.parse(loginRequest["text"])
        const token = loginRequestData["data"];

        const productsListRequest = await request(app).get("/products-list").auth(token, {type: 'bearer'});
        const productsListRequestData = JSON.parse(productsListRequest["text"]);
        expect(productsListRequestData["message"]).toEqual("Products fetched successfully");
        expect(productsListRequestData["data"].length).toEqual(100);
    });

    it("no token present, should give error", async () => {
        const productsListRequest = await request(app).get("/products-list");
        const productsListRequestData = JSON.parse(productsListRequest["text"]);
        expect(productsListRequestData["message"]).toEqual("Access denied!");
        expect(productsListRequest.status).toEqual(400);
    });

    it("invalid token present, should give error", async () => {
        const productsListRequest = await request(app).get("/products-list").auth("xc", {type: 'bearer'});
        const productsListRequestData = JSON.parse(productsListRequest["text"]);
        expect(productsListRequestData["message"]).toEqual("Token invalid");
        expect(productsListRequest.status).toEqual(403);
    });
})