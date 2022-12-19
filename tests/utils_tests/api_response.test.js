const api_response = require("../../utils/api_response");

describe("Tests for api response function", () => {
    it("both message and data are there", () => {
        const data = "data";
        const message = "message";
        const res = {
            data: "data", message: "message"
        }
        expect(api_response(message, data)).toEqual(res)
    });

    it("only message is there", () => {
        const message = "message";
        const res = {
            message: "message",
            data: {}
        }
        expect(api_response(message)).toEqual(res)
    });

    it("only data is there", () => {
        const data = "data";
        const res = {
            data: "data",
            message: ""
        }
        expect(api_response("", data)).toEqual(res)
    });

    it("both message and data are not there", () => {
        const data = {};
        const message = "";
        const res = {
            data: {}, message: ""
        }
        expect(api_response(message, data)).toEqual(res)
    });
})