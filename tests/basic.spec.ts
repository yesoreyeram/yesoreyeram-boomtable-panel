import _ from "lodash";

let sum = (a, b) => a + b;
let max = (a, b) => _.max([a, b]);

describe("Basic Tests", () => {
    it("Sum of two numbers", () => {
        expect(sum(1, 2)).toBe(3);
    });
    it("Max of two numbers", () => {
        expect(max(1, 2)).toBe(2);
    });
})