const dbHandler = require('./db_setup');
const Product = require("../../models/product");
const fakeProducts = require("./fake_products_data.json");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe('products schema ', () => {

    it('products should be successfully added', async () => {
        const products = await Product.create(fakeProducts);
        expect(products.length).toEqual(100);
    });

    it('product should be give missing title error', async () => {
        const data = {
            "id": 1,
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
            "images": [
                "https://dummyjson.com/image/i/products/1/1.jpg",
                "https://dummyjson.com/image/i/products/1/2.jpg",
                "https://dummyjson.com/image/i/products/1/3.jpg",
                "https://dummyjson.com/image/i/products/1/4.jpg",
                "https://dummyjson.com/image/i/products/1/thumbnail.jpg"
            ]
        };
        try {
            await Product.create(data);
        } catch (error) {
            expect(error["errors"]["title"]["kind"]).toEqual("required")
            expect(error["errors"]["title"]["path"]).toEqual("title")
        }
    });

    it('product should be give missing price error', async () => {
        const data = {
            "id": 1,
            "title": "Iphone13",
            "description": "An apple mobile which is nothing like apple",
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
            "images": [
                "https://dummyjson.com/image/i/products/1/1.jpg",
                "https://dummyjson.com/image/i/products/1/2.jpg",
                "https://dummyjson.com/image/i/products/1/3.jpg",
                "https://dummyjson.com/image/i/products/1/4.jpg",
                "https://dummyjson.com/image/i/products/1/thumbnail.jpg"
            ]
        };
        try {
            await Product.create(data);
        } catch (error) {
            expect(error["errors"]["price"]["kind"]).toEqual("required")
            expect(error["errors"]["price"]["path"]).toEqual("price")
        }
    });
});
