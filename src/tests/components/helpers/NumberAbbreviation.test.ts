import { IAbbreviationProps, buildAbbreviationProps } from "../../../helpers/common/numberAbbreviation";

describe("Building of props for number abbreviation", () => {

    let numbersAbbreviate: boolean | undefined;
    let decimalsBillion: number | undefined;
    let decimalsMillion: number | undefined;
    let props: IAbbreviationProps;

    function resetParameters(): void {
        numbersAbbreviate = undefined;
        decimalsBillion = undefined;
        decimalsMillion = undefined;
    }

    describe("Copy of the numbers abbreviating permission flag", () => {

        beforeEach(() => {
            resetParameters();
        });
        
        it("Flag for abbreviating is defaulted to true", () => {
            props = buildAbbreviationProps(numbersAbbreviate, decimalsBillion, decimalsMillion);
            expect(props.numbersAbbreviate).toBe(true);
        });
        it("Flag for abbreviating may be specified and it will be copied as it is", () => {
            numbersAbbreviate = false;
            props = buildAbbreviationProps(numbersAbbreviate, decimalsBillion, decimalsMillion);
            expect(props.numbersAbbreviate).toBe(false);
        });

    })

    describe("Assignment of the amount of decimals for billion-abbreviated values", () => {

        beforeEach(() => {
            resetParameters();
        });
        
        it("If the amount of decimals for billions is unspecified, it is defaulted to two", () => {
            props = buildAbbreviationProps(numbersAbbreviate, decimalsBillion, decimalsMillion);
            expect(props.decimalsBillion).toEqual(2);
        });
        it("If the amount of decimals for billions is specified but lower than 0, a value of 2 is assigned to it", () => {
            decimalsBillion = -4;
            props = buildAbbreviationProps(numbersAbbreviate, decimalsBillion, decimalsMillion);
            expect(props.decimalsBillion).toBe(2);
        });
        it("If the amount of decimals for billions is specified and not negative, it will be assigned as it is", () => {
            decimalsBillion = 3;
            props = buildAbbreviationProps(numbersAbbreviate, decimalsBillion, decimalsMillion);
            expect(props.decimalsBillion).toBe(3);
        });

    })

    describe("Assignment of the amount of decimals for million-abbreviated values", () => {

        beforeEach(() => {
            resetParameters();
        });
        
        it("If the amount of decimals for millions is unspecified, it is defaulted to two", () => {
            props = buildAbbreviationProps(numbersAbbreviate, decimalsBillion, decimalsMillion);
            expect(props.decimalsMillion).toEqual(2);
        });
        it("If the amount of decimals for millions is specified but lower than 0, a value of 2 is assigned to it", () => {
            decimalsMillion = -8;
            props = buildAbbreviationProps(numbersAbbreviate, decimalsBillion, decimalsMillion);
            expect(props.decimalsMillion).toBe(2);
        });
        it("If the amount of decimals for millions is specified and not negative, it will be assigned as it is", () => {
            decimalsMillion = 0;
            props = buildAbbreviationProps(numbersAbbreviate, decimalsBillion, decimalsMillion);
            expect(props.decimalsMillion).toBe(0);
        });

    })

})