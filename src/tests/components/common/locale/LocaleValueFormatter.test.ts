import LocaleValueFormatter, { ILocaleValueFormatterConfig, formattedHits90Days } from "../../../../helpers/common/LocaleValueFormatter";
import { IAbbreviationProps } from "../../../../helpers/common/numberAbbreviation";

let formatter: LocaleValueFormatter;
let config: ILocaleValueFormatterConfig;
let value: number;
let formattedString: string;

describe("Tests for Argentinian locale-wise value formatting", () => {

    describe("Decimal and thousand separation", () => {

        beforeAll(() => {
            config = {
                code: 'AR',
                decimalPlaces: 2,
                decimalsBillion: 2,
                decimalsMillion: 2
            };
            formatter = new LocaleValueFormatter(config);
        })

        it("Argentinian decimal separator is a ',' character", () => {
            value = 310.45;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toContain(",");
            expect(formattedString).not.toContain(".");
        });
        it("Positive numbers lesser than 10000 don't have any thousand separator", () => {
            value = 2425.39;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("2425,39");
        });
        it("Positive numbers greater than or equal to 10000 have a thousand separator", () => {
            value = 27002.14236;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("27.002,14");
        });
        it("Negative numbers bigger than -10000 don't have any thousand separator", () => {
            value = -7119;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("-7119,00");
        });
        it("Negattive numbers lesser than or equal to -10000 have a thousand separator", () => {
            value = -826939.8;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("-826.939,80");
        });
        it("A thousand separator is put every three integer-part digits", () => {
            value = 1879612.877;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("1.879.612,88");
        });

    })

    describe("Abbreviation of too big numbers before applying separators", () => {

        beforeEach(() => {
            config = {
                code: 'AR',
                decimalPlaces: 2,
                decimalsBillion: 4,
                decimalsMillion: 3,
                numbersAbbreviate: true
            };
        })

        it("Percentage values are never abbreviated", () => {
            config.isPercentage = true;
            formatter = new LocaleValueFormatter(config);
            value = 40898195156.225142;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("4.089.819.515.622,51%");
        });
        it("Values big enough but with abbreviation disabled are formatted just as they are", () => {
            config.numbersAbbreviate = false;
            formatter = new LocaleValueFormatter(config);
            value = 946355002.09;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("946.355.002,09");
        });
        it("Values bigger than a billion are divided by a billion and have a 'B' appended", () => {
            formatter = new LocaleValueFormatter(config);
            value = 51004629181337.54;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("51,0046B");
        });
        it("Values smaller than a negative billion are divided by a billion and have a 'B' appended", () => {
            formatter = new LocaleValueFormatter(config);
            value = -156239117481299810;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("-156.239,1175B");
        });
        it("Values bigger than ten million but smaller than a billion are divided by a million and have a 'M' appended", () => {
            formatter = new LocaleValueFormatter(config);
            value = 272091218.91;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("272,091M");
        });
        it("Values smaller than negative ten million but bigger than a negative billion are divided by a million and have a 'M' appended", () => {
            formatter = new LocaleValueFormatter(config);
            value = -81044332715.898;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("-81.044,333M");
        });
        it("Values smaller than ten million and bigger than a ten negative million are not abbreviated at all", () => {
            formatter = new LocaleValueFormatter(config);
            value = 1252002.132;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("1.252.002,13");
        });

    })

    describe("Formatting upon multiple decimal places", () => {

        beforeEach(() => {
            config = {
                code: 'AR',
                decimalPlaces: 2,
                decimalsBillion: 2,
                decimalsMillion: 2
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
                decimalPlaces: 2,
                decimalsBillion: 2,
                decimalsMillion: 2
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

    describe("Prependage of explicit sign when formatting", () => {

        let negativeValue: number;

        beforeAll(() => {
            value = 32358.19;
            negativeValue = -779628.02;
        })

        beforeEach(() => {
            config = {
                code: 'AR',
                decimalPlaces: 2,
                decimalsBillion: 2,
                decimalsMillion: 2
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
            config.explicitSign = true;
            formatter = new LocaleValueFormatter(config);
            formattedString = formatter.formatValue(negativeValue);
            expect(formattedString).toEqual("-779.628,02");
        });

    })

})

describe("Tests for US locale-wise value formatting", () => {

    describe("Decimal and thousand separation", () => {

        beforeAll(() => {
            config = {
                code: 'US',
                decimalPlaces: 2,
                decimalsBillion: 2,
                decimalsMillion: 2
            };
            formatter = new LocaleValueFormatter(config);
        })

        it("US decimal separator is a '.' character", () => {
            value = 169.14775;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("169.15")
        });
        it("US thousand separator is a ',' character", () => {
            value = 10900.298;
            formattedString = formatter.formatValue(value);
            expect(formattedString).toEqual("10,900.30");
        });

    })

})

describe("Tests for specific formatting of the 'hits_90_days' metadata", () => {

    let locale: string;
    let abbreviationProps: IAbbreviationProps;
    let hitsAmount: number;

    beforeAll(() => {
        locale = "AR";
        abbreviationProps = {
            numbersAbbreviate: true,
            decimalsBillion: 2,
            decimalsMillion: 4
        };
    })

    it("The amount of hits is always formatted as an integer number", () => {
        hitsAmount = 1489.19;
        formattedString = formattedHits90Days(locale, abbreviationProps, hitsAmount);
        expect(formattedString).toEqual("1489");
    });
    it("Amounts of hits bigger than ten thousand have the thousand separator applied when formatted", () => {
        hitsAmount = 351987;
        formattedString = formattedHits90Days(locale, abbreviationProps, hitsAmount);
        expect(formattedString).toEqual("351.987");
    });
    it("Really big amounts of hits are abbreviated and have their proper suffix appended", () => {
        hitsAmount = 20003984;
        formattedString = formattedHits90Days(locale, abbreviationProps, hitsAmount);
        expect(formattedString).toEqual("20,0040M");
    });

})