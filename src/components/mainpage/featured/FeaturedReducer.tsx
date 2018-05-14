import featured from "../../../conf/featured";
import Serie from "../../common/serie/Serie";

export default function featuredReducer(state: Serie[] = [], action: any): Serie[] {
    return state.concat(featured);
}
