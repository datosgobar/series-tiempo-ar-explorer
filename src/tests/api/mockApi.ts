import { ISerie } from "../../api/Serie";
import { ISearchOptions, ISearchResultItem, ISerieApi } from "../../api/SerieApi";

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

    public getSeries(ids: string[]): Promise<ISerie[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, ids.map(toSerie))
        })
    }

    public searchSeries(q: string, options?: ISearchOptions): Promise<ISearchResultItem[]> {

        if (options && options.datasetSource) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, this.delay, [
                    toSearchResult("serie01"),
                ]);
            });
        }
        if (options && options.datasetTheme) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, this.delay, [
                    toSearchResult("serie02"),
                ]);
            });
        }
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, [
                toSearchResult("serie01"),
                toSearchResult("serie02"),
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
        bake: () => self,
        data: [],
        description: 'description' + id,
        id,
        publisher: { mbox: 'mail' + id, name: 'publi' + id },
        title: 'title' + id,
    }

    return self;
}

function toSearchResult(id: string): ISearchResultItem {

    return {
        description: 'Description id: ' + id,
        id,
        title: 'title_' + id,
    };
}

export default MockApi;