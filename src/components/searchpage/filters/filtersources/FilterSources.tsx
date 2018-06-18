import * as React from "react";
import { connect } from "react-redux";

import FilterSubTitle from "../../../style/Filters/FilterSubTitle";

import { ISerieApi } from "../../../../api/SerieApi";
import { IStore } from "../../../../store/initialState";
import Selector from "../../../common/selector/Selector";

interface IFilterSourcesProps {

    seriesApi: ISerieApi;
    onSourcePicked: (event: React.SyntheticEvent<HTMLElement>, source: string) => void;
    picked: string;
}

interface IFilterSourcesState {

    sources: string[];
}

export class FilterSources extends React.Component<IFilterSourcesProps, IFilterSourcesState> {

    constructor(props: IFilterSourcesProps) {
        super(props);

        this.state = { sources: [] };

        this.updateSources = this.updateSources.bind(this);
        this.onItemSelected = this.onItemSelected.bind(this);
    }

    public componentDidMount() {
        this.updateSources();
    }

    public updateSources() {
        this.props.seriesApi.fetchSources().then(sources => {
            this.setState({ sources });
        });
    }

    public onItemSelected(event: React.SyntheticEvent<HTMLElement>, item: string) {
        this.props.onSourcePicked(event, item);
    }

    public render() {
        return (
            <div>
                <FilterSubTitle>Fuentes:</FilterSubTitle>
                <Selector
                    selected={this.props.picked}
                    items={this.state.sources}
                    onItemSelected={this.onItemSelected}
                    renderItem={renderSource}
                />
            </div>  
        );
    }
}

function renderSource(source: string) {
    return source;
}


function mapStateToProps(state: IStore) {
    return {
        picked: state.searchParams.datasetSource,
    };
}

export default connect(mapStateToProps)(FilterSources);