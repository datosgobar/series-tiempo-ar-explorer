import { ISerie } from "../api/Serie";
import { ISearchResultItem } from "../api/SerieApi";

export interface IStore {
    featured: ISerie[],
    searchResults: ISearchResultItem[],
    viewSeries: ISerie[],
}

const initialState: IStore = {
    featured: [],
    searchResults: [],
    viewSeries: [],
}

export default initialState;