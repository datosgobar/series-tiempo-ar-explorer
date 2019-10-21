import LocaleValueFormatter, { ILocaleValueFormatterConfig } from "../../../../components/common/locale/LocaleValueFormatter";

let formatter: LocaleValueFormatter;
let config: ILocaleValueFormatterConfig;
let value: number;
let formattedString: string;

describe("Tests for Argentinian locale-wise value formatting", () => {

    describe("Decimal and thousand separation", () => {

        beforeAll(() => {
            config = {
                code: 'AR',
                decimalPlaces: 2
            };
            formatter = new LocaleValueFormatter(config);
        })

        it("Argentinian decimal separator is a ',' character", () => {
            value = 310.45;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toContain(",");
            expect(formattedString).not.toContain(".");
        });
        it("Numbers lesser than 1000 don't have any thousand separator", () => {
            value = 225.39;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("225,39");
        });
        it("Numbers greater than or equal to 1000 have a thousand separator", () => {
            value = 27002.14236;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("27.002,14");
        });
        it("A thousand separator is put every three integer-part digits", () => {
            value = 187961202359.877;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("187.961.202.359,88");
        });

    })

    describe("Formatting upon multiple decimal places", () => {

        beforeEach(() => {
            config = {
                code: 'AR',
                decimalPlaces: 2
            }
            value = 14.08229165;
        })

        it("If no amount of places is specified, only two decimals are taken into account", () => {
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("14,08");
        });
        it("If the amount specified is equal to the number's decimal digits, it's kept as it is", () => {
            config.decimalPlaces = 8;
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("14,08229165");
        });
        it("If more places than the number's decimal digits are specified, it's zero-padded", () => {
            config.decimalPlaces = 10;
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("14,0822916500");
        });
        it("If less places than the number's decimal digits are specified, it's rounded", () => {
            config.decimalPlaces = 4;
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("14,0823");
        });
        it("If zero places are specified, it's formatted as an integer", () => {
            config.decimalPlaces = 0;
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("14");
        });

    })

    describe("Formatting of percentage and non-percentage values", () => {

        beforeAll(() => {
            value = 0.16256904;
        })
        
        beforeEach(() => {
            config = {
                code: 'AR',
                decimalPlaces: 2
            }
        })

        it("A non-percentage value is not shifted", () => {
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("0,16");
        });
        it("A percentage value is multiplied by 100 and has a '%' sign appended", () => {
            config.isPercentage = true;
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("16,26%");
        });

    })

    describe("Prependage of explicit sign to when formatting", () => {

        let negativeValue: number;

        beforeAll(() => {
            value = 32358.19;
            negativeValue = -1779628.02;
        })

        beforeEach(() => {
            config = {
                code: 'AR',
                decimalPlaces: 2
            }
        })

        it("Positive value with no explicit sign specified has no prependage", () => {
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("32.358,19");
        });
        it("Positive value with explicit sign specified has a '+' character prepended", () => {
            config.explicitSign = true;
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("+32.358,19");
        });
        it("Negative value has a '-' character prepended despite the config", () => {
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(negativeValue);
            expect(formattedString).toEqual("-1.779.628,02");
        });

    })

})

describe("Tests for US locale-wise value formatting", () => {

    describe("Decimal and thousand separation", () => {

        beforeAll(() => {
            config = {
                code: 'US',
                decimalPlaces: 2
            };
            formatter = new LocaleValueFormatter(config);
        })

        it("US decimal separator is a '.' character", () => {
            value = 169.14775;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("169.15")
        });
        it("US thousand separator is a ',' character", () => {
            value = 1900.298;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("1,900.30");
        });

    })

})