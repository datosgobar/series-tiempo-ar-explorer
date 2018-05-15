import actionTypes from "./actionTypes";

export let loadFeatured = (featured: JSX.Element[]) => {
    return {type: actionTypes.LOAD_FEATURED, featured};
}