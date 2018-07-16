import QueryParams from "../../api/QueryParams";
import SearchResult from "../../api/SearchResult";
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

    public searchSeries(q: string, options?: ISearchOptions): Promise<SearchResult[]> {

        if (options && options.datasetSource) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, this.delay, [
                    toSerie("serie01"),
                ]);
            });
        }
        if (options && options.datasetTheme) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, this.delay, [
                    toSerie("serie02"),
                ]);
            });
        }
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, [
                toSerie("serie01"),
                toSerie("serie02"),
            ]);
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
};

function toSerie(id: string): ISerie {

    const self = {
        accrualPeriodicity: `${id} accrualPeriodicity`,
        bake: () => self,
        data: [],
        description: 'description' + id,
        id,
        index: {start: `${id} index start`, end: `${id} index end`},
        publisher: { mbox: 'mail' + id, name: 'publi' + id },
        title: 'title' + id,
        units: `${id} units`,

        issued: `${id} issued`,
        landingPage: `${id} landingPage`,
        themes: [`${id} theme`],
    }

    return self;
}

export default MockApi;