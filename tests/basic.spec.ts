jest.mock("app/core/utils/kbn", () => { });
jest.mock("app/core/time_series2", () => { });

import _ from "lodash";
import { normalizeColor, parseMathExpression, getColor, getActualNameWithoutTokens, getItemBasedOnThreshold } from "./../src/app/boom"

describe("Normalize Color", () => {
    it("Normalize Named Colors", () => {
        expect(normalizeColor("Green")).toBe("rgba(50, 172, 45, 0.97)");
        expect(normalizeColor("Orange")).toBe("rgba(237, 129, 40, 0.89)");
        expect(normalizeColor("Red")).toBe("rgba(245, 54, 54, 0.9)");
        expect(normalizeColor("Purple")).toBe("Purple");
    });
});

describe("Get Color", () => {
    it("Color Strings", () => {
        expect(getColor("Green", 0)).toBe(` style="color:rgba(50, 172, 45, 0.97)" `);
        expect(getColor("Orange", 0)).toBe(` style="color:rgba(237, 129, 40, 0.89)" `);
        expect(getColor("Red", 0)).toBe(` style="color:rgba(245, 54, 54, 0.9)" `);
        expect(getColor("Purple", 0)).toBe(` style="color:Purple" `);
    });
});

describe("Parse Math Tokens", () => {
    it("Sum", () => {
        expect(parseMathExpression("15+5", 0)).toBe(20);
        expect(parseMathExpression("0.2+2.3", 0)).toBe(3);
    });
    it("Substraction", () => {
        expect(parseMathExpression("15-5", 0)).toBe(10);
        expect(parseMathExpression("0.2-2.3", 0)).toBe(-2);
    });
    it("Multiplication", () => {
        expect(parseMathExpression("3*5", 0)).toBe(15);
        expect(parseMathExpression("0.2*2", 0)).toBe(0);
        expect(parseMathExpression("0.3*2", 0)).toBe(1);
    });
    it("Division", () => {
        expect(parseMathExpression("9/5", 0)).toBe(2);
        expect(parseMathExpression("0.2/2", 0)).toBe(0);
        expect(parseMathExpression("2.3/2", 0)).toBe(1);
    });
    it("Min", () => {
        expect(parseMathExpression("9min5", 0)).toBe(5);
        expect(parseMathExpression("5min9", 0)).toBe(5);
        expect(parseMathExpression("9min0.4", 0)).toBe(0);
        expect(parseMathExpression("5min0.9", 0)).toBe(1);
    });
});

describe("Get Actial name without tokens", () => {
    it("Row and colname", () => {
        expect(getActualNameWithoutTokens("hello")).toBe("hello");
        expect(getActualNameWithoutTokens("hello how are you!")).toBe("hello how are you!");
        expect(getActualNameWithoutTokens("hello _fa-circle_ how are you")).toBe("hello  how are you");
    });
});

describe("Threshold Validator", () => {
    it("BG Colors", () => {
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 5, "black")).toBe("green");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 10, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 15, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red", "blue"], 15, "black")).toBe("orange");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 20, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 25, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange", "red"], 20, "black")).toBe("red");
        expect(getItemBasedOnThreshold([10, 20], ["green", "orange"], 25, "black")).toBe("black");
    })
})