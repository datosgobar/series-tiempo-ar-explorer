import { ISerie } from "../../api/Serie";
import { ISearchResultItem, ISerieApi } from "../../api/SerieApi";

const DELAY = 1000;


class MockApi implements ISerieApi {

    private delay: number;

    constructor(delay?: number) {
        this.delay = delay || DELAY;
    }

    public getSeries(ids: string[]): Promise<ISerie[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, ids.map(toSerie))
        })
    }

    public searchSeries(q: string, datasetSource?: string, offset?: number | undefined, limit?: number | undefined): Promise<ISearchResultItem[]> {
        
        if (datasetSource) {return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, [
                toSearchResult("serie01"),
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
        // return Promise.resolve(["Ministerio de Cultura"]);
        return new Promise((resolve, reject) => {
            setTimeout(resolve, this.delay, [
                "Ministerio de Cultura",
                "Ministerio de Modernizacion",
            ]);
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