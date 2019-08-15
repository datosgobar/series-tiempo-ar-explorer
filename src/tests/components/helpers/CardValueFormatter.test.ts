import { CardValueFormatter } from "../../../helpers/card/cardValueFormatter";

describe("CardValueFormatter", () => {

    describe("Positive values", () => {

        const percValue : number = 0.120918;
        const value : number = 26.0720161742;

        it("AR locale, percentage value with explicit sign option", () => {
            const formatter = new CardValueFormatter("AR", true, true)
            expect(formatter.formattedValue(percValue)).toEqual('+12,09%')
        });
        it("AR locale, percentage value without explicit sign option", () => {
            const formatter = new CardValueFormatter("AR", true, false)
            expect(formatter.formattedValue(percValue)).toEqual('12,09%')
        });
        it("AR locale, non-percentage value with explicit sign option", () => {
            const formatter = new CardValueFormatter("AR", false, true)
            expect(formatter.formattedValue(value)).toEqual('+26,07')
        });
        it("AR locale, non-percentage value without explicit sign option", () => {
            const formatter = new CardValueFormatter("AR", false, false)
            expect(formatter.formattedValue(value)).toEqual('26,07')
        });
        it("US locale, percentage value with explicit sign option", () => {
            const formatter = new CardValueFormatter("US", true, false)
            expect(formatter.formattedValue(percValue)).toEqual('12.09%')
        }); 
    })

    describe("Negative values", () => {

        const percValue : number = -0.120918
        const value : number = -26.0720161742

        it("AR locale, percentage value,  is ignored because of negative value", () => {
            const formatter = new CardValueFormatter("AR", true, false)
            expect(formatter.formattedValue(percValue)).toEqual('-12,09%')
        })
        it("AR locale, non-percentage value, explicit plus sign sign is prepended because of negative value", () => {
            const formatter = new CardValueFormatter("AR", false, true)
            expect(formatter.formattedValue(value)).toEqual('-26,07')
        })
        it("US locale, non-percentage value, explicit plus sign sign is prepended because of negative value", () => {
            const formatter = new CardValueFormatter("US", false, true)
            expect(formatter.formattedValue(value)).toEqual('-26.07')
        })

    })

})