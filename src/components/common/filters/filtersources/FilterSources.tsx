import * as React from "react";
import { connect } from "react-redux";

import { IStore } from "../../../../store/initialState";
import IFilterProps from "../FilterProps";


interface IFilterSourcesProps extends IFilterProps {

    onSourcePicked: (event: React.SyntheticEvent<HTMLElement>, source: string) => void;
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
        this.props.seriesApi.fetchSources().then((sources: string[]) => {
            this.setState({ sources });
        });
    }

    public onItemSelected(event: React.SyntheticEvent<HTMLElement>, item: string) {
        this.props.onSourcePicked(event, item);
    }

    public render() {
        const Selector = this.props.selector;
        return (
                <Selector
                    selected={this.props.picked}
                    items={this.state.sources}
                    onItemSelected={this.onItemSelected}
                    renderItem={renderSource}
                />
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