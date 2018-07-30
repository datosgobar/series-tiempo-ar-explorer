import DataPoint, { IDataPoint } from './DataPoint';
import {IExtraMeta, IPublisher, ITSAPIResponse, ITSMeta} from './ITSAPIResponse'


export interface ISerie {
    id: string;
    title: string;
    publisher: IPublisher;
    description: string;
    data: IDataPoint[];
    accrualPeriodicity: string;
    index:{
        start: string,
        end: string,
    };
    units: string;
    landingPage: string,
    issued: string,
    themes: string[],
    frequency?: string,
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

    private get distributionMeta() {
        return this.meta.distribution;
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
            this.fieldMeta.description
        );
    }

    get publisher(): IPublisher {
        return (
            this.datasetMeta.publisher
        );
    }

    get description(): string {
        return (
            this.datasetMeta.title
        );
    }

    get data(): DataPoint[] {
        return this.tsResponse.data
            .map((datapoint: any[]) => {
                return new DataPoint(datapoint, this.responseIndex)
            }
            );
    }

    get accrualPeriodicity() {
        return this.datasetMeta.accrualPeriodicity;
    }

    get units() {
        return this.fieldMeta.units;
    }

    get index() {
        return this.fieldMeta.index
    }

    get landingPage(){
        return this.datasetMeta.landingPage;
    }
    
    get issued() {
        return this.distributionMeta.issued;
    }

    get themes() {
        return this.datasetMeta.theme;
    }

    get frequency(): string {
        const extraMeta = this.tsResponse.meta[0] as IExtraMeta;
        return extraMeta.frequency;
    }

    public bake(): ISerie {
        return {
            accrualPeriodicity: this.accrualPeriodicity,
            data: this.data.map((datapoint: DataPoint) => datapoint.bake()),
            description: this.description,
            frequency: this.frequency,
            id: this.id,
            index: this.index,
            issued: this.issued,
            landingPage: this.landingPage,
            publisher: {...this.publisher},
            themes: [...this.themes],
            title: this.title,
            units: this.units,
        };
    }
}
