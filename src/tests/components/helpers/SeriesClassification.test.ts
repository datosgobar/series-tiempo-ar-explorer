import { ISerie } from "../../../api/Serie"
import { generateEmptySerie, generateCommonMockSerieEMAE } from "../../support/mockers/seriesMockers";
import { emptySerie, serieWithData } from "../../../helpers/common/seriesClassification";
import { IDataPoint } from "../../../api/DataPoint";

describe("Test for functions that classify Serie objects", () => {

    let serie: ISerie;
    let allNullDatapointSet: IDataPoint[];

    beforeAll(() => {
        allNullDatapointSet = [{ date: "2018-09-01", value: null },
            { date: "2018-10-01", value: null },
            { date: "2018-11-01", value: null },
            { date: "2018-12-01", value: null },
            { date: "2019-01-01", value: null },
            { date: "2019-02-01", value: null },
            { date: "2019-03-01", value: null }];
    })

    describe("Tests for checking if a Serie is empty or not", () => {

        let notNullDatapointSet: IDataPoint[];

        beforeAll(() => {
            notNullDatapointSet = [{ date: "2018-09-01", value: null },
                { date: "2018-10-01", value: null },
                { date: "2018-11-01", value: 145.78 },
                { date: "2018-12-01", value: null },
                { date: "2019-01-01", value: 199 },
                { date: "2019-02-01", value: null }];
        })

        beforeEach(() => {
            serie = generateEmptySerie();
        })

        it('A serie with no data points is considered empty', () => {
            expect(emptySerie(serie)).toBe(true);
        });
        it('A serie whose every data point has null value is considered empty', () => {
            serie.data = allNullDatapointSet;
            expect(emptySerie(serie)).toBe(true);
        });
        it('A serie with at least one not-null data point is considered non-empty', () => {
            serie.data = notNullDatapointSet;
            expect(emptySerie(serie)).toBe(false);
        });

    })

    describe("Tests for checking if a Serie has data or not", () => {

        beforeEach(() => {
            serie = generateCommonMockSerieEMAE();
        })

        it('A serie with at least one non-null data point is considered to have data', () => {
            expect(serieWithData(serie)).toBe(true);
        });
        it('A serie with no data points is considered to not have data', () => {
            serie.data = [];
            expect(serieWithData(serie)).toBe(false);
        });
        it('A serie with every data point null-valued is considered to not have data', () => {
            serie.data = allNullDatapointSet;
            expect(serieWithData(serie)).toBe(false);
        });

    })

})