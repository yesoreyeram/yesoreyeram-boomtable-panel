import { COLORS, normalizeColor, getDecimalsForValue } from "./../src/app/utils";

describe("Utils GetDecimalsForValue", () => {
    describe("With decimals", () => {
        it("returns 2 decimals", () => {
            let result: any = getDecimalsForValue(3.14159265359, 2);
            expect(result.decimals).toBe(2);
        });
        it("returns 1 decimal", () => {
            let result: any = getDecimalsForValue(3.14159265359, 1);
            expect(result.decimals).toBe(1);
        });
        it("returns no decimal", () => {
            let result: any = getDecimalsForValue(3.14159265359, 0);
            expect(result.decimals).toBe(0);
        });
    });
    describe("Without decimals", () => {
        it("returns 2 decimal", () => {
            let result: any = getDecimalsForValue(3, 2);
            expect(result.decimals).toBe(2);
        });
    });
});
describe("Utils Normalize Color",()=>{
    describe("With named color",()=>{
        it("returns Grafana green", () => {
            let result = normalizeColor("Green");
            expect(result).toBe(COLORS.GREEN);
        });
        it("returns Grafana red", () => {
            let result = normalizeColor("Red");
            expect(result).toBe(COLORS.RED);
        });
    });
    describe("With unnamed color",()=>{
        it("returns white", () => {
            let result = normalizeColor("#fff");
            expect(result).toBe("#fff");
        });
    });
});