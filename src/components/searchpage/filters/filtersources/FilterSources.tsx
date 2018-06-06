import * as React from "react";
import { connect } from "react-redux";

import { ISerieApi } from "../../../../api/SerieApi";
import { IStore } from "../../../../store/initialState";

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

        this.handleClick = this.handleClick.bind(this);
        this.toRadioButton = this.toRadioButton.bind(this);
    }

    public updateSources() {
        this.props.seriesApi.fetchSources().then(sources => {
            this.setState({ sources });
        });
    }

    public componentDidMount() {
        this.updateSources()
    }

    public handleClick(source: string) {
        return (event: React.SyntheticEvent<HTMLElement>) => {
            this.props.onSourcePicked(event, source);
        };
    }

    public render() {
        return (
            <div>
                <h3>Sources</h3>
                <div>
                    {this.state.sources.map(this.toRadioButton)}
                </div>
            </div>
        );
    }

    public toRadioButton(source: string) {
        return (
            <div className="Source" key={source}>
                <label>
                    <input type="radio" value={source} checked={this.props.picked === source} onChange={this.handleClick(source)} />
                    {source}
                </label>
            </div>);
    }
}

function mapStateToProps(state: IStore) {
    return {
        picked: state.searchParams.datasetSource,
    };
}

export default connect(mapStateToProps)(FilterSources);