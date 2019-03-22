import * as React from "react";
import { connect } from "react-redux";
import { IAggregationValue } from "../../../api/ITSAPIResponse";
import { same } from "../../../helpers/commonFunctions";
import { IStore } from "../../../store/initialState";
import SearchFilter from "../../common/selector/SearchFilter";
import { IFilterProps } from "./FilterThemes";


interface IFilterSourcesProps extends IFilterProps {
    onSourcePicked: (source: string) => void;
    sources: IAggregationValue[];
}

export class FilterSources extends React.Component<IFilterSourcesProps, any> {

    constructor(props: IFilterSourcesProps) {
        super(props);
    }

    public render() {
        return <SearchFilter selected={this.props.picked}
                                items={this.props.sources}
                                onChange={this.props.onSourcePicked}
                                renderItem={same} />
    }
}


function mapStateToProps(state: IStore) {
    return {
        picked: state.searchParams.datasetSource,
        sources: state.aggregations.dataset_source,
    };
}

export default connect(mapStateToProps)(FilterSources);