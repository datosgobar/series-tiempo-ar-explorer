import { formatSerieValue } from "../../../helpers/graphic/formatterForSerie";

describe("Unit tests for the formatSerieValue function", () => {

    let value: number;
    let formatted: string;

    describe("Decimal separator, depending on the locale", () => {

        beforeAll(() => {
            value = 0.1526;
        })

        it("If the locale is AR, a ',' is used as separator", () => {
            formatted = formatSerieValue(value, "AR", false);
            expect(formatted).toEqual("0,1526");
        })
        it("If the locale is US, a '.' is used as separator", () => {
            formatted = formatSerieValue(value, "US", false);
            expect(formatted).toEqual("0.1526");
        })

    })

    describe("Value shifting, depending on the isPercentage flag", () => {

        beforeAll(() => {
            value = 0.478;
        })

        it("If the flag is set to false, the value is not shifted", () => {
            formatted = formatSerieValue(value, "AR", false);
            expect(formatted).toEqual("0,478");
        })
        it("If the flag is set to false, the value is multiplied by 100 and a '%' character is appended", () => {
            formatted = formatSerieValue(value, "AR", true);
            expect(formatted).toEqual("47,8%");
        })

    })

    describe("Value rounding, depending on the decimals amount specified", () => {

        beforeAll(() => {
            value = 7.919723;
        })

        it("If no amount is specified, the number is kept as it is", () => {
            formatted = formatSerieValue(value, "AR", false);
            expect(formatted).toEqual("7,919723");
        })
        it("If the amount specified is the same as the number's, it's kept as it is", () => {
            formatted = formatSerieValue(value, "AR", false, 6);
            expect(formatted).toEqual("7,919723");
        })
        it("If the amount specified is lesser than the number's, it's rounded to that amount of digits", () => {
            formatted = formatSerieValue(value, "AR", false, 3);
            expect(formatted).toEqual("7,920");
        })
        it("If the amount specified is bigger than the number's, it's right padded with '0's", () => {
            formatted = formatSerieValue(value, "AR", false, 9);
            expect(formatted).toEqual("7,919723000");
        })
        it("If the amount specified is 0, the number is rounded to an integer", () => {
            formatted = formatSerieValue(value, "AR", false, 0);
            expect(formatted).toEqual("8");
        })

    })

});