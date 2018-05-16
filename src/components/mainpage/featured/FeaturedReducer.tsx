import actionTypes from "../../../actions/actionTypes";
import { ISerie } from "../../../api/Serie";
import initialState from "../../../store/initialState";


export default function featuredReducer(state: ISerie[] = initialState.featured, action: any): ISerie[] {
    
    switch(action.type){
        case actionTypes.LOAD_FEATURED: return [...action.featured];
    }
    
    return state;
}
