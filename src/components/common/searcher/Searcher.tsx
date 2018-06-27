import * as React from "react";

import SearchResult from "../../../api/SearchResult";
import { ISearchOptions, ISerieApi } from "../../../api/SerieApi";


export interface ISearchParams {

    datasetSource: string;
    datasetTheme: string;
    limit: number;
    offset: number;
    q: string;
}

export interface ISearcherProps extends ISearchParams {

    seriesApi: ISerieApi;

    renderSearchResults: (searchResults: SearchResult[]) => JSX.Element | JSX.Element[];
}

interface ISearcherState {

    searchResults: SearchResult[];
}

export default class Searcher extends React.Component<ISearcherProps, ISearcherState> {

    constructor(props: ISearcherProps) {
        super(props);

        this.state = {
            searchResults: [],
        };
    }

    public searchOptions() {
        return {
            datasetSource: this.props.datasetSource,
            datasetTheme: this.props.datasetTheme,
            limit: this.props.limit,
            offset: this.props.offset,
        }
    }

    public componentDidMount() {

        if (!this.props.q) {
            return;
        }

        this.performSearch(this.props.q, this.searchOptions());
    }

    public componentDidUpdate(prevProps: ISearcherProps) {
        if (this.props.q &&
            (prevProps.q !== this.props.q ||
                prevProps.datasetTheme !== this.props.datasetTheme ||
                prevProps.datasetSource !== this.props.datasetSource ||
                prevProps.offset !== this.props.offset ||
                prevProps.limit !== this.props.limit
            )) {
            this.performSearch(this.props.q, this.searchOptions());
        }
    }

    public render() {
        return (
            <div>
                {this.props.renderSearchResults(this.state.searchResults)}
            </div>
        );
    }

    private performSearch(q: string, options?: ISearchOptions) {
        this.props.seriesApi.searchSeries(q, options)
            .then((searchResults: SearchResult[]) => {
                this.setState({ searchResults });
            }).catch(alert);
    }
}
