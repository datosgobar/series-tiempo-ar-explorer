import {buildLocale} from "../../../../components/common/locale/buildLocale";


describe("LocaleAR", () => {
    it("returns a comma as decimal separator", () => {
        const locale = buildLocale('AR');
        expect(locale.decimalSeparator()).toEqual(',');
    });

    it("returns a dot as thousand separator", () => {
        const locale = buildLocale('AR');
        expect(locale.thousandSeparator()).toEqual('.');
    });

    it("returns 12,300.592", () => {
        const locale = buildLocale('AR');
        expect(locale.toLocaleString(12300.5919999)).toEqual('12,300.592');
    });

});
