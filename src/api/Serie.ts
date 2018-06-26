import DataPoint, { IDataPoint } from './DataPoint';
import {IPublisher, ITSAPIResponse, ITSMeta} from './ITSAPIResponse'


export interface ISerie {
    id: string;
    title: string;
    publisher: IPublisher;
    description: string;
    data: IDataPoint[];
    accuralPeriodicity: string;
    index:{
        start: string,
        end: string,
    };
    units: string;
}


export default class Serie implements ISerie {

    constructor(private responseIndex: number, private tsResponse: ITSAPIResponse) {
        
    }

    private get meta(): ITSMeta {
        return this.tsResponse.meta[this.responseIndex] as ITSMeta;
    }

    private get datasetMeta() {
        return this.meta.dataset;
    }

    private get fieldMeta() {
        return this.meta.field;
    }

    get id(): string {
        return (
            this.fieldMeta.id
        );
    }

    get title(): string {
        return (
            // TODO: definir que titulo mostrar para una serie
            this.fieldMeta.title
        );
    }

    get publisher(): IPublisher {
        return (
            this.datasetMeta.publisher
        );
    }

    get description(): string {
        return (
            this.fieldMeta.description
        );
    }

    get data(): DataPoint[] {
        return this.tsResponse.data
            .map((datapoint: any[]) => {
                return new DataPoint(datapoint, this.responseIndex)
            }
            );
    }

    get accuralPeriodicity() {
        return this.fieldMeta.accuralPeriodicity;
    }

    get units() {
        return this.fieldMeta.units;
    }

    get index() {
        return this.fieldMeta.index
    }

    public bake(): ISerie {
        return {
            accuralPeriodicity: this.accuralPeriodicity,
            data: this.data.map((datapoint: DataPoint) => datapoint.bake()),
            description: this.description,
            id: this.id,
            index: this.index,
            publisher: {mbox: this.publisher.mbox, name: this.publisher.mbox},
            title: this.title,
            units: this.units,
        };
    }
}
