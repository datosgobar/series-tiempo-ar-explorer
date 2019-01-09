import {ISerie} from "./Serie";
import {i18nFrequency} from "./utils/periodicityManager";

export default class SerieConfig {

    private serie: ISerie;
    private percentChange: boolean;
    private percentChangeAYearAgo: boolean;
    private formatUnits: boolean;

    public constructor(serie: ISerie) {
        this.serie = serie;
    }

    public getSerieId() {
        return this.serie.id;
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

    public setMustFormatUnits(format: boolean) {
        this.formatUnits = format;
    }

    public mustFormatUnits(formatUnits: boolean):boolean {
        return formatUnits && (this.formatUnits || this.getPercentChange() || this.getPercentChangeAYearAgo());
    }

    public getSeriePeriodicity(): string {
        return i18nFrequency(this.serie.frequency || 'year');
    }

}