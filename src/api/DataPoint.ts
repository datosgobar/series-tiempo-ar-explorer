
export interface IDataPoint {

    date: string;
    value: number;
}

export default class DataPoint implements IDataPoint {

    private datapoint: any[];
    private index: number;

    constructor(datapoint: any[], index: number){
        this.datapoint = datapoint;
        this.index = index;
    }

    get date(): string {
        return this.datapoint[0];
    }

    get value(): number {
        return this.datapoint[this.index];
    }
}
