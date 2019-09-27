import {Action} from "redux";
import actionTypes from "./actionTypes";

export interface IHeroImageUrlAction extends Action<string> {
    heroImageUrl: string;
}

export function setHeroImageUrl(heroImageUrl: string): IHeroImageUrlAction {
    return { type: actionTypes.SET_HERO_IMAGE_URL, heroImageUrl };
}