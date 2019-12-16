import { ISerie } from "../../../api/Serie";
import { IChartExtremeProps } from "../../../components/viewpage/graphic/Graphic";
import { chartExtremes } from "../../../helpers/graphic/chartExtremes";
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos } from "../../support/mockers/seriesMockers";

let series: ISerie[];
let dateRange: { start: string; end: string; };

function evaluateTimestamps(startDate: string, endDate: string, last?: number) {

    const expectedStartTimestamp = new Date(startDate).getTime();
    const expectedEndTimestamp = new Date(endDate).getTime();
    const extremes = chartExtremes(series, dateRange, last);
    expect(extremes.min).toEqual(expectedStartTimestamp);
    expect(extremes.max).toEqual(expectedEndTimestamp);

}

describe("Tests for obtainment of a chart's time axis extremes", () => {

    let extremes: IChartExtremeProps;

    let expectedTimestamp: number;
    let serieOne: ISerie;
    let serieTwo: ISerie;

    beforeAll(() => {
        serieOne = generateCommonMockSerieEMAE();
        serieTwo = generateCommonMockSerieMotos();
    })

    describe("Obtainment of the extremes without the 'last' parameter taken into account", () => {
        
        it("If no series are involved, the interval starts at zero an has no length", () => {
            series = [];
            dateRange = {
                start: "2019-04-02",
                end: "2019-06-05"
            };
            extremes = chartExtremes(series, dateRange);
            expect(extremes.min).toEqual(0);
            expect(extremes.max).toEqual(0);
        });
        it("If there is no data subsequent to the range start, the interval starts at the first date's timestamp", () => {
            series = [serieOne, serieTwo];
            dateRange = {
                start: "2019-08-01",
                end: "2019-10-01"
            };
            expectedTimestamp = new Date(serieOne.data[0].date).getTime();
            extremes = chartExtremes(series, dateRange);
            expect(extremes.min).toEqual(expectedTimestamp);
        });
        it("If there is no data subsequent to the range ending, the interval ends at the last date's timestamp", () => {
            series = [serieOne, serieTwo];
            dateRange = {
                start: "2018-07-01",
                end: "2019-12-01"
            };
            expectedTimestamp = new Date(serieOne.data[serieOne.data.length - 1].date).getTime();
            extremes = chartExtremes(series, dateRange);
            expect(extremes.max).toEqual(expectedTimestamp);
        });
        it("If the range extremes are lesser and greater than the first and last date, the interval equals the range", () => {
            series = [serieOne, serieTwo];
            dateRange = {
                start: "2018-11-01",
                end: "2019-02-01"
            };
            evaluateTimestamps(dateRange.start, dateRange.end);
        });

    })

    describe("Obtainment of the extremes upon the last n values of the original range, which is inside the dates", () => {

        let last: number;

        beforeAll(() => {
            series = [serieOne, serieTwo];
            dateRange = {
                start: "2018-09-01",
                end: "2019-02-01"
            };
        }) 
        
        it("If the amount of last values asked for is smaller than the interval's length, the interval starts there", () => {
            last = 3;
            evaluateTimestamps("2018-12-01", dateRange.end, last);
        });
        it("If the amount of last values asked for is bigger than the interval's length, the interval is kept the same", () => {
            last = 20;
            evaluateTimestamps(dateRange.start, dateRange.end, last);
        });
        it("If the amount of last values asked for is only one, just the last value of the interval is returned", () => {
            last = 1;
            evaluateTimestamps(dateRange.end, dateRange.end, last);
        });
        it("Asking for a negative amount of last values is the same than asking for the last itself", () => {
            const lastOneValueExtremes = chartExtremes(series, dateRange, 1);
            const lastNegativeExtremes = chartExtremes(series, dateRange, -2)
            expect(lastOneValueExtremes.min).toEqual(lastNegativeExtremes.min);
            expect(lastOneValueExtremes.max).toEqual(lastNegativeExtremes.max);
        })
        
    })

})