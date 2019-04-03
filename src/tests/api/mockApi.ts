import { ISearchResponse } from "../../api/ITSAPIResponse";
import QueryParams from "../../api/QueryParams";
import { ISerie } from "../../api/Serie";
import { ISearchOptions, ISerieApi } from "../../api/SerieApi";

const DELAY = 1000;
const SOURCES = [
    "Ministerio de Cultura",
    "Ministerio de Modernizacion",
];
const THEMES = [
    "Consumo",
    "Sector Externo",
    "Empresas",
    "Producción",
    "Economía Internacional",
    "Inversión",
    "Precios",
];

class MockApi implements ISerieApi {

    private delay: number;
    private sources: string[];
    private themes: string[];

    constructor(delay?: number, sources?: string[], themes?: string[]) {
        this.delay = delay || DELAY;
        this.sources = sources || SOURCES;
        this.themes = themes || THEMES;
    }

    public fetchSeries(params: QueryParams): Promise<ISerie[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, params.getIds().split(',').map(toSerie))
        })
    }

    public simpleFetchSeries(params: QueryParams): Promise<ISerie[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, params.getIds().split(',').map(toSerie))
        })
    }

    public searchSeries(q: string, options?: ISearchOptions): Promise<ISearchResponse> {
        if (options && options.datasetSource) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, this.delay, {count:1, result: [toSerie("serie01")]});
            });
        }

        if (options && options.datasetTheme) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, this.delay, {count:1, result: [toSerie("serie02")]});
            });
        }

        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, {count:1, result: [toSerie("serie01"), toSerie("serie02")]});
        });
    }

    public fetchSources(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, this.sources);
        });
    }

    public fetchThemes(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, this.themes);
        });
    }

    public downloadDataURL(params: QueryParams):string {
        return 'foo';
    }
}

export function toSerie(id: string): ISerie {
    const self = {
        accrualPeriodicity: `${id} accrualPeriodicity`,
        bake: () => self,
        data: [],
        datasetSource: '',
        datasetTitle: '',
        description: 'description' + id,
        distributionTitle: '',
        downloadURL: '',
        endDate: 'end',
        id,
        issued: `${id} issued`,
        publisher: { mbox: 'mail' + id, name: 'publi' + id },
        title: 'title' + id,
        units: `${id} units`,

        landingPage: `${id} landingPage`,
        maxValue: 1,
        minValue: 0,
        modified: `2018-01-01`,
        representationModeUnits: `${id} rep mode units`,
        startDate: 'start',
        themes: [{id: `${id} theme`, label: `${id} theme`, descripcion: `${id} theme`}],
        timeIndexSize: 0,
    };

    return self;
}

export default MockApi;