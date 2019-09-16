import LocaleDefault from "../../../../components/common/locale/LocaleDefault";

describe("Tests for the LocaleDefault class", () => {

    let locale: LocaleDefault;
    let valueOne: number;
    let valueTwo: number;
    let decimalAmount: number;
    let finalString: string;

    beforeAll(() => {
        locale = new LocaleDefault();
        valueOne = 18.17932654;
        valueTwo = 32.00875;
    })

    it("A comma is used as a decimal separator", () => {
        finalString = locale.toDecimalString(valueTwo);
        expect(finalString).toContain(",");
        expect(finalString).not.toContain(".");
    });
    it("If no decimal amount is specified, only two are considered", () => {
        finalString = locale.toDecimalString(valueOne);
        expect(finalString).toEqual("18,18");
    });
    it("When specified decimal amount is lesser than the value's, it is rounded", () => {
        decimalAmount = 4;
        finalString = locale.toDecimalString(valueOne, decimalAmount);
        expect(finalString).toEqual("18,1793");
    });
    it("When specified decimal amount is greater than the value's, it is zero-padded", () => {
        decimalAmount = 9;
        finalString = locale.toDecimalString(valueTwo, decimalAmount);
        expect(finalString).toEqual("32,008750000");
    });
    it("When specified decimal amount is zero, the value is treated as an integer", () => {
        decimalAmount = 0;
        finalString = locale.toDecimalString(valueOne, decimalAmount);
        expect(finalString).toEqual("18");
    });

})