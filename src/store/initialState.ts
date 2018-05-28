import { ISerie } from "../api/Serie";
import { ISearchResultItem, ISerieApi } from "../api/SerieApi";

export interface IStore {
    featured: ISerie[],
    searchResults: ISearchResultItem[],
    viewSeries: ISerie[],
    seriesApi: ISerieApi | null,
}

const initialState: IStore = {
    featured: [],
    searchResults: [],
    seriesApi: null,    
    viewSeries: [],
}

export default initialState;