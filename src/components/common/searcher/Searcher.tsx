import * as React from "react";
import { connect } from "react-redux";

import { ISearchOptions, ISearchResultItem, ISerieApi } from "../../../api/SerieApi";
import { IStore } from "../../../store/initialState";
import SearchBox from "../../common/searchbox/SearchBox";


export interface ISearchParams {

    datasetSource: string;
    datasetTheme: string;
    limit: number;
    offset: number;
    q: string;
}

interface ISearcherProps extends ISearchParams {

    seriesApi: ISerieApi;
    onWillSearch?: (q: string, datasetSource: string, theme: string, offset: number, limit: number) => void;

    renderSearchResults: (searchResults: ISearchResultItem[]) => JSX.Element;
}

interface ISearcherState {

    searchResults: ISearchResultItem[];
}

export class Searcher extends React.Component<ISearcherProps, ISearcherState> {

    constructor(props: ISearcherProps) {
        super(props);

        this.state = {
            searchResults: [],
        };

        this.search = this.search.bind(this);
    }

    public searchOptions(){
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
        if (prevProps.q !== this.props.q ||
            prevProps.datasetTheme !== this.props.datasetTheme ||
            prevProps.datasetSource !== this.props.datasetSource ||
            prevProps.offset !== this.props.offset ||
            prevProps.limit !== this.props.limit
        ) {
            this.performSearch(this.props.q, this.searchOptions());
        }
    }

    public search(q?: string, datasetSource?: string, datasetTheme?:string, offset?: number, limit?: number) {

        if (!q) {
            return;
        }

        datasetSource = datasetSource || this.props.datasetSource;
        offset = offset || this.props.offset;
        limit = limit || this.props.limit;
        datasetTheme = datasetTheme || this.props.datasetTheme;

        if (this.props.onWillSearch) {
            this.props.onWillSearch(q, datasetSource, datasetTheme, offset, limit);
        }
    }

    public render() {
        return (
            <div className="Searcher">
                <SearchBox 
                searchTerm={this.props.q} 
                onSearch={this.search} 
                seriesApi={this.props.seriesApi}
                />

                {this.props.renderSearchResults(this.state.searchResults)}
            </div>
        );
    }

    private performSearch(q: string, options?: ISearchOptions) {
        this.props.seriesApi.searchSeries(q, options)
            .then((searchResults: ISearchResultItem[]) => {
                this.setState({ searchResults });
            }).catch(alert);
    }
}

function mapStateToProps(state: IStore, ownProps: ISearcherProps) {
    return ({
        ...state.searchParams,
        seriesApi: state.seriesApi,
    });
}

export default connect(mapStateToProps)(Searcher);
