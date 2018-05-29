import * as React from "react";

import { ISearchResultItem, ISerieApi } from "../../../api/SerieApi";
import SearchBox from "../../common/searchbox/SearchBox";
import SearchResults from "../searchresults/SearchResults";


interface ISearcherProps {

    seriesApi: ISerieApi;
    limit: number;
    offset: number;
    q: string;
    onWillSearch?: (q: string, offset: number, limit: number) => void;
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
        this.search(this.props.q)
    }

    public componentWillReceiveProps(nextProps: ISearcherProps) {
        if (nextProps.q !== this.props.q ||
            nextProps.offset !== this.props.offset ||
            nextProps.limit !== this.props.limit
        ) {
            this.search(nextProps.q, nextProps.offset, nextProps.limit);
        }
    }

    public search(q?: string, offset?: number, limit?: number) {

        q = q || this.props.q

        if (!q) {
            return;
        }

        offset = offset || this.props.offset;
        limit = limit || this.props.limit;

        if (this.props.onWillSearch) {
            this.props.onWillSearch(q, offset, limit);
        }

        this.performSearch(q, offset, limit);
    }

    public render() {
        return (
            <div className="Searcher">
                <SearchBox searchTerm={this.props.q} onSearch={this.search} />

                <SearchResults searchResults={this.state.searchResults} />
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
