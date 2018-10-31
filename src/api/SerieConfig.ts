export default class SerieConfig {

    private serieId: string;
    private percentChange: boolean;
    private percentChangeAYearAgo: boolean;

    public constructor(serieId: string) {
        this.serieId = serieId;
    }

    public getSerieId() {
        return this.serieId;
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

    public mustFormatUnits(formatUnits: boolean, formatUnitsBySerie: boolean):boolean {
        return formatUnits && (formatUnitsBySerie || this.getPercentChange() || this.getPercentChangeAYearAgo());
    }

}