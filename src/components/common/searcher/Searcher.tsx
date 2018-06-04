import * as React from "react";

import { ISearchResultItem, ISerieApi } from "../../../api/SerieApi";
import SearchBox from "../../common/searchbox/SearchBox";


interface ISearcherProps {

    seriesApi: ISerieApi;
    limit: number;
    offset: number;
    q: string;
    onWillSearch?: (q: string, offset: number, limit: number) => void;
    renderSearchResults: (searchResults: ISearchResultItem[]) => JSX.Element;
}

interface ISearcherState {

    searchResults: ISearchResultItem[];
}

class Searcher extends React.Component<ISearcherProps, ISearcherState> {

    constructor(props: ISearcherProps) {
        super(props);

        this.state = {
            searchResults: [],
        };

        this.search = this.search.bind(this);
    }

    public componentDidMount() {

        if (!this.props.q) {
            return;
        }

        this.performSearch(this.props.q, this.props.offset, this.props.limit);
    }

    public componentDidUpdate(prevProps: ISearcherProps) {
        if (prevProps.q !== this.props.q ||
            prevProps.offset !== this.props.offset ||
            prevProps.limit !== this.props.limit
        ) {
            this.performSearch(this.props.q, this.props.offset, this.props.limit);
        }
    }

    public search(q?: string, offset?: number, limit?: number) {

        if (!q) {
            return;
        }

        offset = offset || this.props.offset;
        limit = limit || this.props.limit;

        if (this.props.onWillSearch) {
            this.props.onWillSearch(q, offset, limit);
        }
    }


    public render() {
        return (
            <div className="Searcher">
                <SearchBox searchTerm={this.props.q} onSearch={this.search} />

                {this.props.renderSearchResults(this.state.searchResults)}
            </div>
        );
    }

    private performSearch(q: string, offset: number, limit: number) {
        this.props.seriesApi.searchSeries(q, offset, limit)
            .then((searchResults: ISearchResultItem[]) => {
                this.setState({ searchResults });
            }).catch(alert);
    }
}

export default Searcher;