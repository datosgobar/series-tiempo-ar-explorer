import ITsResponse, { IPublisher } from './ITsResponse'


export interface ISerie {
    id: string;
    title: string;
    publisher: IPublisher;
    description: string;
}


export default class Serie implements ISerie {
    private query: ITsResponse;
    private index: number;

    constructor(index: number, query: ITsResponse) {
        this.query = query;
        this.index = index;
    }

    get id(): string {
        return (
            this.query.meta[this.index + 1].dataset[this.index].distribution[this.index].field[this.index].id
        );
    }

    get title(): string {
        return (
            // TODO: definir que titulo mostrar para una serie
            this.query.meta[this.index + 1].dataset[this.index].distribution[this.index].field[this.index].title
        );
    }

    get publisher(): IPublisher {
        return (
            this.query.meta[this.index + 1].dataset[this.index].publisher
        );
    }

    get description(): string {
        return (
            this.query.meta[this.index + 1].dataset[this.index].distribution[this.index].field[this.index].description
        );
    }

    get data(): IDataPoint[] {
        return this.query.data
            .map((datapoint: object) => {
                return { date: datapoint[0], value: datapoint[this.index + 1] }
            });
    }
}

interface IDataPoint {
    date: string;
    value: number;
}
