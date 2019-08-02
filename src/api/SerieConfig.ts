import {IDataPoint} from "./DataPoint";
import {ISerie} from "./Serie";
import {i18nFrequency} from "./utils/periodicityManager";
import { getFullSerieId } from "../components/viewpage/graphic/Graphic";

export default class SerieConfig {

    private serie: ISerie;
    private percentChange: boolean;
    private percentChangeAYearAgo: boolean;

    public constructor(serie: ISerie) {
        this.serie = serie;
    }

    public getFullSerieId() {
        return getFullSerieId(this.serie);
    }

    public getPercentChange() {
        return this.percentChange;
    }

    public getPercentChangeAYearAgo() {
        return this.percentChangeAYearAgo;
    }

    public setPercentChange(percentChange: boolean) {
        this.percentChange = percentChange;
    }

    public setPercentChangeAYearAgo(percentChangeAYearAgo: boolean) {
        this.percentChangeAYearAgo = percentChangeAYearAgo;
    }

    public mustFormatUnits(formatUnits: boolean):boolean {
        const formatFromAPI = this.serie.isPercentage === undefined ? this.checkFormatFromData() : this.serie.isPercentage;

        return formatUnits && formatFromAPI;
    }

    public getSeriePeriodicity(): string {
        return i18nFrequency(this.serie.frequency || 'year');
    }

    private checkFormatFromData(): boolean {
        const canFormatSerie = this.serie.data.every((data: IDataPoint) => data.value > -1 && data.value < 1);

        return canFormatSerie || this.getPercentChange() || this.getPercentChangeAYearAgo()
    }

}