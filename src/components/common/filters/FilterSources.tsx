import * as React from "react";
import { connect } from "react-redux";
import { IAggregationValue } from "../../../api/ITSAPIResponse";
import { same } from "../../../helpers/commonFunctions";
import { IStore } from "../../../store/initialState";
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
        const Selector = this.props.selector;
        return (
                <Selector
                    selected={this.props.picked}
                    items={this.props.sources.map((e:any)=>e.label)}
                    onChange={this.props.onSourcePicked}
                    renderItem={same}
                />
        );
    }
}


function mapStateToProps(state: IStore) {
    return {
        picked: state.searchParams.datasetSource,
        sources: state.aggregations.dataset_source,
    };
}

export default connect(mapStateToProps)(FilterSources);