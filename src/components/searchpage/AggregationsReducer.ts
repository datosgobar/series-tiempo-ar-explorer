import actionTypes from "../../actions/actionTypes";
import { ISetAggsAction } from "../../actions/searchActions";
import { IAggregations } from "../../api/ITSAPIResponse";
import initialState from "../../store/initialState";


export default function aggregationsReducer(state: IAggregations = initialState.aggregations, action: ISetAggsAction): IAggregations {
    switch (action.type) {
        case actionTypes.SET_AGGREGATIONS: return {...action.aggregations};
        default: return state;
    }
}
