import { IDataPoint } from "../../../api/DataPoint"
import { lastNonNullPoint } from "../../../helpers/common/serieDataHandling";

describe("Obtainment of the last non-null-valued DataPoint from an array", () => {

    let points: IDataPoint[];
    let desiredPoint: IDataPoint;
    
    it("If the very last point of the array has a non-null value, it is returned", () => {
        points = [
            { date: '2014-03-30', value: 2 },
            { date: '2014-11-27', value: 1 },
            { date: '2015-05-07', value: 1 },
            { date: '2017-05-14', value: 3 },
            { date: '2018-03-14', value: 2 },
            { date: '2018-12-09', value: 3 },
            { date: '2019-10-22', value: 2 }
        ];
        desiredPoint = lastNonNullPoint(points);
        expect(desiredPoint.date).toEqual('2019-10-22');
        expect(desiredPoint.value).toBe(2);
    });
    it("The non-null-valued point of the array with the greatest index will be returned", () => {
        points = [
            { date: '1988-10-01', value: null },
            { date: '1988-11-01', value: 0 },
            { date: '1988-12-01', value: 25 },
            { date: '1989-01-01', value: null },
            { date: '1989-02-01', value: null }
        ];
        desiredPoint = lastNonNullPoint(points);
        expect(desiredPoint.date).toEqual('1988-12-01');
        expect(desiredPoint.value).toBe(25);
    });
    it("If every point in the array is null-valued, the first one is returned", () => {
        points = [
            { date: '2004-01-01', value: null },
            { date: '2005-01-01', value: null },
            { date: '2006-01-01', value: null }
        ];
        desiredPoint = lastNonNullPoint(points);
        expect(desiredPoint.date).toEqual('2004-01-01');
        expect(desiredPoint.value).toBeNull();
    });

})