import { CardValueFormatter, ICardValueFormatterConf } from "../../../helpers/card/cardValueFormatter";

describe("CardValueFormatter class tests", () => {

    let valueOne: number;
    let valueTwo: number;
    let negativeValue: number;
    let percValue: number;
    let conf: ICardValueFormatterConf;

    function createBasicConf(): void {
        conf = {
            decimals: 2,
            explicitSign: false,
            isPercentage: false,
            locale: "AR"
        };
    }

    beforeAll(() => { 
        valueOne = 26.0720161742;
        valueTwo = 99.962390015;
        negativeValue = -55.8974;
        percValue = 0.120918;
    })

    describe("Decimal separator variations depending on the locale", () => {

        beforeEach(() => {
            createBasicConf();
        })

        it("AR locale uses a ',' as separator", () => {
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(valueOne)).toEqual('26,07');
        })
        it("Other locales use a '.' as a separator", () => {
            conf.locale = "US";
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(valueOne)).toEqual('26.07');
        })

    })

    describe("Percentage and non-percentage formatting for values", () => {

        beforeEach(() => {
            createBasicConf();
        })

        it("Not treating the number as percentage does not format its value", () => {
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(percValue)).toEqual('0,12');
        })
        it("Treating the number as percentage multiplies its value by 100 and appends the '%' character", () => {
            conf.isPercentage = true;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(percValue)).toEqual('12,09%');
        })

    })

    describe("Prependage of explicit positive sign", () => {

        beforeEach(() => {
            createBasicConf();
        })

        it("Explicit sign flag turned off does not prepend anything to positive values", () => {
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(valueTwo)).toEqual('99,96');
        })
        it("Explicit sign flag turned on prepends a '+' character to positive values", () => {
            conf.explicitSign = true;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(valueTwo)).toEqual('+99,96');
        })
        it("Negative values always have the '-' character prepended to them", () => {
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(negativeValue)).toEqual('-55,90');
        })
        it("Explicit sign flag turned on does not prepend the '+' to negative values", () => {
            conf.explicitSign = true;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(negativeValue)).toEqual('-55,90');
        })

    })

    describe("Different amounts of decimal digits after the separator", () => {

        beforeEach(() => {
            createBasicConf();
        })

        it("Using the same amount of digits that the number has does not format its value", () => {
            conf.decimals = 6;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(percValue)).toEqual('0,120918');
        })
        it("Using more digits than the number has pads its value with right-sided '0's", () => {
            conf.decimals = 8;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(negativeValue)).toEqual('-55,89740000');
        })
        it("Using less digits than the number has rounds its value", () => {
            conf.decimals = 5;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(valueOne)).toEqual('26,07202');
        })
        it("Using zero digits than the number has formats its value to an integer", () => {
            conf.decimals = 0;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(valueTwo)).toEqual('100');
        })

    })

    /*describe("Positive values", () => {

        beforeAll(() => {
            percValue = 0.120918;
            value = 26.0720161742;
        })
        
        beforeEach(() => {
            conf = {
                decimals: 2,
                explicitSign: true,
                isPercentage: true,
                locale: "AR"
            };
        })

        it("AR locale, percentage value with explicit sign option", () => {
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(percValue)).toEqual('+12,09%');
        });
        it("AR locale, percentage value without explicit sign option", () => {
            conf.explicitSign = false;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(percValue)).toEqual('12,09%');
        });
        it("AR locale, non-percentage value with explicit sign option", () => {
            conf.isPercentage = false;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(value)).toEqual('+26,07');
        });
        it("AR locale, non-percentage value without explicit sign option", () => {
            conf.isPercentage = false;
            conf.explicitSign = false;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(value)).toEqual('26,07');
        });
        it("US locale, percentage value without explicit sign option", () => {
            conf.locale = "US";
            conf.explicitSign = false;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(percValue)).toEqual('12.09%');
        }); 
    })

    describe("Negative values", () => {

        beforeAll(() => {
            percValue = -0.120918;
            value = -26.0720161742;
        })

        beforeEach(() => {
            conf = {
                decimals: 2,
                explicitSign: true,
                isPercentage: true,
                locale: "AR"
            };
        })

        it("AR locale, percentage value, false explicit sign flag is ignored because of negative value", () => {
            conf.explicitSign = false;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(percValue)).toEqual('-12,09%');
        })
        it("AR locale, non-percentage value, explicit plus sign is ignored because of negative value", () => {
            conf.isPercentage = false;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(value)).toEqual('-26,07');
        })
        it("US locale, non-percentage value, false explicit sign flag is ignored because of negative value", () => {
            conf.locale = "US";
            conf.isPercentage = false;
            conf.explicitSign = false;
            const formatter = new CardValueFormatter(conf);
            expect(formatter.formattedValue(value)).toEqual('-26.07');
        })

    })*/

})