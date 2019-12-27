import { IDataPoint } from "../../api/DataPoint";

export function lastNonNullPoint(datapoints: IDataPoint[]): IDataPoint {

    const valuesAmount = datapoints.length;
    for (let i = valuesAmount - 1; i >= 0; i--) {
        if(datapoints[i].value !== null) {
            return datapoints[i];
        }
    }
    return datapoints[0];

}