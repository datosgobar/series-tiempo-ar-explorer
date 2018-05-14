import featured from "../../../conf/featured";
import initialState from "../../../store/initialState";
import Serie from "../../common/serie/Serie";

export default function featuredReducer(state: Serie[] = initialState.featured, action: any): Serie[] {
    return state.concat(featured);
}
