import {formattedDateString, fullLocaleDate, shortLocaleDate} from "../../../helpers/common/dateFunctions";


describe("QueryParams", () => {
    it("returns 2018-01", () => {
        const date = '2018';
        expect(formattedDateString(date)).toEqual('2018-01');
    });

    it("returns 2018-01", () => {
        const date = '2018/01';
        expect(formattedDateString(date)).toEqual('2018-01');
    });

    it("returns 2018-03", () => {
        const date = '2018/03';
        expect(formattedDateString(date)).toEqual('2018-03');
    });

    it("tests fullLocaleDate", () => {
        const date = new Date('2018/04/25').setHours(3);
        expect(fullLocaleDate('Anual', date)).toEqual('2018');
        expect(fullLocaleDate('Semestral', date)).toEqual('1° semestre 2018');
        expect(fullLocaleDate('Trimestral', date)).toEqual('2° trimestre 2018');
        expect(fullLocaleDate('Mensual', date)).toEqual('Abril 2018');
        expect(fullLocaleDate('Diaria', date)).toEqual('25 Abril, 2018');
    });

    it("tests shortLocaleDate", () => {
        const date = '2018/04/25';
        expect(shortLocaleDate('Anual', date)).toEqual('2018');
        expect(shortLocaleDate('Semestral', date)).toEqual('1S 18');
        expect(shortLocaleDate('Trimestral', date)).toEqual('2T 18');
        expect(shortLocaleDate('Mensual', date)).toEqual('abr. 18');
        expect(shortLocaleDate('Diaria', date)).toEqual('25 abr. 18');
    });

});
