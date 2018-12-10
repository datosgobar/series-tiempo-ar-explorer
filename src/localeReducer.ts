import actionTypes from "./actions/actionTypes";
import {ILocaleAction} from "./actions/seriesActions";
import initialState from "./store/initialState";

export default function localeReducer(state: string = initialState.locale, action: ILocaleAction): string {

    switch (action.type) {
        case actionTypes.SET_LOCALE: return action.locale;
        default: return state;
    }
}
