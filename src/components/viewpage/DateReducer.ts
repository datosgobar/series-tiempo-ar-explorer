import actionTypes from "../../actions/actionTypes";
import { IDate } from "../../api/DateSerie";
import initialState from "../../store/initialState";


export default function dateReducer(state: IDate = initialState.date, action: any): IDate {

    switch(action.type){
        case actionTypes.LOAD_DATE: return {...action.date};
        case actionTypes.CLEAR_DATE: return { start: '', end: ''};
        default: return state;
    }
}
