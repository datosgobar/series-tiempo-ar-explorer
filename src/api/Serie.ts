import {valueExist} from "../helpers/commonFunctions";
import DataPoint, { IDataPoint } from './DataPoint';
import {IDataSetTheme, IExtraMeta, IPublisher, ITSAPIResponse, ITSMeta} from './ITSAPIResponse'
import {PeriodicityManager} from "./utils/periodicityManager";


export interface ISerie {
    id: string;
    title: string;
    datasetTitle: string;
    publisher: IPublisher;
    description: string;
    data: IDataPoint[];
    datasetSource: string;
    distributionTitle: string;
    accrualPeriodicity: string;
    startDate: string;
    endDate: string;
    units: string;
    landingPage: string,
    issued: string,
    modified: string,
    themes: IDataSetTheme[],
    frequency?: string,
    timeIndexSize: number,
    representationMode: string,
    representationModeUnits: string,
    downloadURL: string,
    minValue: number,
    maxValue: number,
}

export default class Serie implements ISerie {

    private periodicityParser: PeriodicityManager;

    constructor(private responseIndex: number, private tsResponse: ITSAPIResponse) {
        this.periodicityParser = new PeriodicityManager(this.fieldMeta.frequency);
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
            this.fieldMeta.title
        );
    }

    get datasetTitle(): string {
        return (
            this.datasetMeta.title
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

    get datasetSource(): string {
        const source = this.datasetMeta.source;
        return valueExist(source) ? source : this.publisher.name;
    }

    get data(): DataPoint[] {
        return this.tsResponse.data.map((datapoint: any[]) => new DataPoint(datapoint, this.responseIndex));
    }

    get accrualPeriodicity() {
        return this.periodicityParser.formattedPeriodicity();
    }

    /**
     * @deprecated use representationModeUnits instead.
     */
    get units() {
        return this.fieldMeta.units;
    }

    get representationModeUnits() {
        return this.fieldMeta.representation_mode_units || 'Cantidad'; // default porque a veces viene null. Podríamos llegar a querer usar otro
    }

    get representationMode(): string {
        return this.tsResponse.params.representation_mode;
    }

    get startDate() {
        return this.periodicityParser.formatDate(this.fieldMeta.time_index_start);
    }

    get endDate() {
        return this.periodicityParser.formatDate(this.fieldMeta.time_index_end);
    }

    get landingPage(){
        return this.datasetMeta.landingPage;
    }

    get issued() {
        return this.distributionMeta.issued;
    }

    get modified() {
        return this.distributionMeta.modified;
    }

    get distributionTitle() {
        return this.distributionMeta.title;
    }

    get themes() {
        return this.datasetMeta.theme;
    }

    get frequency(): string {
        const extraMeta = this.tsResponse.meta[0] as IExtraMeta;
        return extraMeta.frequency;
    }

    get timeIndexSize(): number {
        return this.fieldMeta.time_index_size
    }

    get downloadURL(): string {
        return this.distributionMeta.downloadURL;
    }

    get minValue(): number {
        return parseFloat(this.fieldMeta.min_value);
    }

    get maxValue(): number {
        return parseFloat(this.fieldMeta.max_value);
    }

    public bake(): ISerie {
        return {
            accrualPeriodicity: this.accrualPeriodicity,
            data: this.data.map((datapoint: DataPoint) => datapoint.bake()),
            datasetSource: this.datasetSource,
            datasetTitle: this.datasetTitle,
            description: this.description,
            distributionTitle: this.distributionTitle,
            downloadURL: this.downloadURL,
            endDate: this.endDate,
            frequency: this.frequency,
            id: this.id,
            issued: this.issued,
            landingPage: this.landingPage,
            maxValue: this.maxValue,
            minValue: this.minValue,
            modified: this.modified,
            publisher: {...this.publisher},
            representationMode: this.representationMode,
            representationModeUnits: this.representationModeUnits,
            startDate: this.startDate,
            themes: [...this.themes],
            timeIndexSize: this.timeIndexSize,
            title: this.title,
            units: this.units,
        };
    }
}
