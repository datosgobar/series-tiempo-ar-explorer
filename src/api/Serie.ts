import DataPoint, { IDataPoint } from './DataPoint';
import ITSAPIResponse, { IPublisher } from './ITSAPIResponse'


export interface ISerie {
    id: string;
    title: string;
    publisher: IPublisher;
    description: string;
    data: IDataPoint[];
}


export default class Serie implements ISerie {
    private tsResponse: ITSAPIResponse;
    private index: number;

    private get meta() {
        return this.tsResponse.meta[this.index];
    }

    private get datasetMeta() {
        return this.meta.dataset[0];
    }

    private get distributionMeta() {
        return this.datasetMeta.distribution[0];
    }

    private get fieldMeta() {
        return this.distributionMeta.field[0];
    }

    constructor(index: number, tsResponse: ITSAPIResponse) {
        this.tsResponse = tsResponse;
        this.index = index;
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
                return new DataPoint(datapoint, this.index)
            }
            );
    }

    public bake(): ISerie {
        return {
            data: this.data.map((datapoint: DataPoint) => datapoint.bake()),
            description: this.description,
            id: this.id,
            publisher: {mbox: this.publisher.mbox, name: this.publisher.mbox},
            title: this.title,
        };
    }
}