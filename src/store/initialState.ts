import { ISerie } from "../api/Serie";
import { ISerieApi } from "../api/SerieApi";

export interface IStore {
    featured: ISerie[],
    viewSeries: ISerie[],
    seriesApi: ISerieApi | null,
}

const initialState: IStore = {
    featured: [],
    seriesApi: null,    
    viewSeries: [],
}

export default initialState;
