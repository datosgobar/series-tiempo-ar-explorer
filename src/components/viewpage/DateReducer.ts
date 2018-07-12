import actionTypes from "../../actions/actionTypes";
import { IDateRange } from "../../api/DateSerie";
import initialState from "../../store/initialState";


export default function dateReducer(state: IDateRange = initialState.date, action: any): IDateRange {

    switch(action.type){
        case actionTypes.LOAD_DATE: return {...action.date};
        case actionTypes.CLEAR_DATE: return { start: '', end: ''};
        default: return state;
    }
}
