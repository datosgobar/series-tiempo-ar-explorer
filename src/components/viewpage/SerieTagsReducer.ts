import actionTypes from "../../actions/actionTypes";
import {ITagNamesAction} from "../../actions/seriesActions";
import {ISerieTag} from "./SeriesTags";


export default function serieTagsReducer(state: ISerieTag[] = [{id:'', title:''}], action: ITagNamesAction): ISerieTag[] {

    switch(action.type){
        case actionTypes.SET_SERIE_TAGS: return action.serieTags;
        default: return state;
    }
}
