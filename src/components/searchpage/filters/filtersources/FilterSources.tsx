import * as React from "react";
import { connect } from "react-redux";

import { ISerieApi } from "../../../../api/SerieApi";
import { IStore } from "../../../../store/initialState";

interface IFilterSourcesProps {

    seriesApi: ISerieApi;
    onSourcePicked: (event: React.MouseEvent<HTMLElement>, source: string) => void;
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
        this.toListItem = this.toListItem.bind(this);
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
        return (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            this.props.onSourcePicked(event, source);
        };
    }

    public render() {
        return (
            <div>
                <h3>Sources</h3>
                <ul>
                    {this.state.sources.map(this.toListItem)}
                </ul>
            </div>
        );
    }

    public toListItem(source: string) {
        if (this.props.picked === source) {
            return this.highLight(this.sourceListItem(source));
        }

        return this.sourceListItem(source);
    }

    public highLight(element: JSX.Element) {
        return <b>{element}</b>
    }

    public sourceListItem(source: string) {
        return <li key={source} className="Source">{source} <a href="#" onClick={this.handleClick(source)} >filtrar</a></li>
    }

}

function mapStateToProps(state: IStore) {
    return {
        picked: state.searchParams.datasetSource,
    };
}

export default connect(mapStateToProps)(FilterSources);