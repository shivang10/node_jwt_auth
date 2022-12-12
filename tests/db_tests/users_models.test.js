const dbHandler = require('./db_setup');
const User = require("../../models/user");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe('user schema ', () => {

    it('should successfully create user', async () => {
        const data = {
            username: "username", email: "email@email.com", password: "password"
        }
        const user1 = await User.create(data);
        expect(user1.username).toEqual("username")
    });

    it('should give error on missing email', async () => {
        const data = {
            username: "username", password: "password"
        }

        try {
            const user1 = await User.create(data);
            expect(user1.username).toEqual("username")

        } catch (error) {
            expect(error["errors"]["email"]["kind"]).toEqual("required")
            expect(error["errors"]["email"]["path"]).toEqual("email")
        }
    });

    it('should give error on missing username', async () => {
        const data = {
            email: "email@email.com", password: "password"
        }

        try {
            const user1 = await User.create(data);
            expect(user1.username).toEqual("username")

        } catch (error) {
            expect(error["errors"]["username"]["kind"]).toEqual("required")
            expect(error["errors"]["username"]["path"]).toEqual("username")
        }
    });

    it('should give error on missing password', async () => {
        const data = {
            username: "username", email: "email@email.com"
        }

        try {
            const user1 = await User.create(data);
            expect(user1.username).toEqual("username")

        } catch (error) {
            expect(error["errors"]["password"]["kind"]).toEqual("required")
            expect(error["errors"]["password"]["path"]).toEqual("password")
        }
    });
});
