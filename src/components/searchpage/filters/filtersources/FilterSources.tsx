import * as React from "react";

import { ISerieApi } from "../../../../api/SerieApi";

interface IFilterSourcesProps {

    seriesApi: ISerieApi;
    onSourcePicked: (event: React.MouseEvent<HTMLLIElement>, source:string) => void;
}

interface IFilterSourcesState {

    sources: string[];
}

class FilterSources extends React.Component<IFilterSourcesProps, IFilterSourcesState> {

    constructor(props: IFilterSourcesProps) {
        super(props);

        this.state = { sources: [] };

        this.handleClick = this.handleClick.bind(this);
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
        return (event: React.MouseEvent<HTMLLIElement>) => {
            this.props.onSourcePicked(event, source)
        };
    }

    public render() {
        return (
            <div>
                <h3>Sources</h3>
                <ul>
                    {this.state.sources.map((source, index) =>
                        <li key={source} onClick={this.handleClick(source)} className="Source">{source}</li>
                    )}
                </ul>
            </div>
        );
    }
}



export default FilterSources;