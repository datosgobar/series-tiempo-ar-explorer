import { ISerie } from "../components/common/serie/Serie";
import actionTypes from "./actionTypes";

export function loadFeatured(featured: ISerie[]) {
    return { type: actionTypes.LOAD_FEATURED, featured };
}