import {valueExist} from "../helpers/common/commonFunctions";
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
    collapseAggregation: string,
    isPercentage: boolean,
    significantFigures: number
}

export const DEFAULT_SIGNIFICANT_FIGURES = 2;

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
        return this.meta.field.representation_mode;
    }

    get collapseAggregation(): string {
        return this.tsResponse.params.collapse_aggregation;
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
        return this.datasetMeta.theme || emptyDatasetThemes();
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
        let result = parseFloat(this.fieldMeta.min_value);
        if (this.representationModeUnits.includes('porcentual')) {
            result = -1;
        }

        return result;
    }

    get maxValue(): number {
        let result = parseFloat(this.fieldMeta.max_value);
        if (this.representationModeUnits.includes('porcentual')) {
            result = 1;
        }

        return result;
    }

    get isPercentage(): boolean {
        return this.fieldMeta.is_percentage;
    }

    get significantFigures(): number {
        return this.fieldMeta.significant_figures;
    }

    public bake(): ISerie {
        return {
            accrualPeriodicity: this.accrualPeriodicity,
            collapseAggregation: this.collapseAggregation,
            data: this.data.map((datapoint: DataPoint) => datapoint.bake()),
            datasetSource: this.datasetSource,
            datasetTitle: this.datasetTitle,
            description: this.description,
            distributionTitle: this.distributionTitle,
            downloadURL: this.downloadURL,
            endDate: this.endDate,
            frequency: this.frequency,
            id: this.id,
            isPercentage: this.isPercentage,
            issued: this.issued,
            landingPage: this.landingPage,
            maxValue: this.maxValue,
            minValue: this.minValue,
            modified: this.modified,
            publisher: {...this.publisher},
            representationMode: this.representationMode,
            representationModeUnits: this.representationModeUnits,
            significantFigures: this.significantFigures,
            startDate: this.startDate,
            themes: [...this.themes],
            timeIndexSize: this.timeIndexSize,
            title: this.title,
            units: this.units,
        };
    }
}

function emptyDatasetThemes(): IDataSetTheme[] {
    return [{descripcion: '-', id: '-', label: '-'}]
}