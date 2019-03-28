const assert = require("assert");
describe("test2", () => {
    it("should not fail", () => {
        assert.equal(1, 1);
        console.log("yay!");
    })
    it("should also not fail", () => {
        assert.equal(1, 2);
    })
})
