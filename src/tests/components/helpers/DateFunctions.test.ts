import {formattedDateString} from "../../../helpers/dateFunctions";


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
});
