import Serie from "../components/common/serie/Serie";
import actionTypes from "./actionTypes";

export let loadFeatured = (featured: Serie[]) => {
    return {type: actionTypes.LOAD_FEATURED, featured};
}