import actionTypes from "../../actions/actionTypes";


export default function tagNamesReducer(state: string[] = [''], action: any): string[] {

    switch(action.type){
        case actionTypes.SET_TAG_NAMES: return {...action.tagNames};
        default: return state;
    }
}
