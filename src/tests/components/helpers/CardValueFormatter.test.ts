import { buildLocale } from "../../../components/common/locale/buildLocale";
import { CardValueFormatter } from "../../../helpers/cardValueFormatter";

describe("CardValueFormatter", () => {

    const locale = buildLocale("AR")

    describe("Positive values", () => {

        const percValue : number = 0.120918
        const value : number = 144.68734573900312

        it("AR locale, percentage value with explicit sign option", () => {
            const formatter = new CardValueFormatter(locale, true, true)
            expect(formatter.formattedValue(percValue)).toEqual('+12,09%')
        })
        it("AR locale, percentage value without explicit sign option", () => {
            const formatter = new CardValueFormatter(locale, true, false)
            expect(formatter.formattedValue(percValue)).toEqual('12,09%')
        })
        it("AR locale, non-percentage value with explicit sign option", () => {
            const formatter = new CardValueFormatter(locale, false, true)
            expect(formatter.formattedValue(value)).toEqual('+144,69')
        })
        it("AR locale, non-percentage value with explicit sign option", () => {
            const formatter = new CardValueFormatter(locale, false, false)
            expect(formatter.formattedValue(value)).toEqual('144,69')
        })
        
    })
})