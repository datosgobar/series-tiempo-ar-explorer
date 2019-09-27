import actionTypes from "./actions/actionTypes";
import { IHeroImageUrlAction } from "./actions/heroActions";
import initialState from "./store/initialState";

export default function heroImageUrlReducer(state: string = initialState.heroImageUrl, action: IHeroImageUrlAction): string {

    switch (action.type) {
        case actionTypes.SET_HERO_IMAGE_URL: return action.heroImageUrl;
        default: return state;
    }
}