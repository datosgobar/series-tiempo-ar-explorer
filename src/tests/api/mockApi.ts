import { ISerie } from "../../api/Serie";
import { ISearchResultItem, ISerieApi } from "../../api/SerieApi";

const DELAY = 2000;


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

    public searchSeries(q: string, offset?: number | undefined, limit?: number | undefined): Promise<ISearchResultItem[]> {
        return Promise.resolve([]);
    }

    public fetchSources() {
        return Promise.resolve(["Ministerio de Cultura"]);
    }
};

function toSerie(id: string) {
    return {
        description: 'description' + id,
        id,
        publisher: { mbox: 'mail' + id, name: 'publi' + id },
        title: 'title' + id,
    }
}

export default MockApi;