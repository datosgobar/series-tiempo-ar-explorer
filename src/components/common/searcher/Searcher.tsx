import * as React from "react";
import { setSourceFilters } from "../../../actions/searchActions";
import { ISearchResponse } from "../../../api/ITSAPIResponse";
import SearchResult from "../../../api/SearchResult";
import { ISearchOptions, ISerieApi } from "../../../api/SerieApi";
import LoadingSpinner from "../LoadingSpinner";
import InitialSearcher from "./InitialSearcher";
import SearcherResults from "./SearcherResults";


export interface ISearchParams {
    datasetSource: string;
    datasetTheme: string;
    limit: number;
    offset: number;
    q?: string;
    publisher: string;
    units: string;
    catalogId: string;
}

export interface ISearcherProps extends ISearchParams {
    seriesApi: ISerieApi;
    renderSearchResults: (searchResults: SearchResult[]) => JSX.Element | JSX.Element[];
    dispatch?: any;
}

interface ISearcherState {
    count: number;
    currentPage: number;
    result: SearchResult[];
    searched: boolean;
    loading: boolean;
}

export default class Searcher extends React.Component<ISearcherProps, ISearcherState> {

    constructor(props: ISearcherProps) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.state = {
            count: 0,
            currentPage: 0,
            loading: false,
            result: [],
            searched: false
        };
    }

    public searchOptions(params=this.props) {
        return {
            aggregations: true,
            datasetSource: params.datasetSource,
            datasetTheme: params.datasetTheme,
            limit: params.limit,
            offset: params.offset,
            publisher: params.publisher,
            units: params.units,
        }
    }

    public componentDidMount() { // this is to avoid searching with the default value ("")
        setTimeout(() => {
            if (!this.state.searched) {
                this.performSearch(this.props.q, this.searchOptions());
            }
        }, 0);
    }

    public componentDidUpdate(prevProps: ISearcherProps) {
        window.scrollTo(0, 0);

        if (this.props.q !== prevProps.q) {
            this.setState({ currentPage: 0 });
        }

        if (queryChanged(prevProps, this.props)) {
            this.performSearch(this.props.q, this.searchOptions());
        }
    }

    public handlePageClick(btnClicked: any) {
        this.setState({currentPage: btnClicked.selected});
        const newParams = {...this.props};
        newParams.offset = this.getOffsetByPage(btnClicked.selected);

        this.clearResults();
        this.performSearch(this.props.q, this.searchOptions(newParams));
    }

    public render() {
        let component = <InitialSearcher />;
        if (this.state.searched) {
            component = <SearcherResults pageCount={this.pageCount()}
                                         onPageChange={this.handlePageClick}
                                         currentPage={this.state.currentPage}
                                         totalFound={this.state.count}>
                            {this.props.renderSearchResults(this.state.result)}
                        </SearcherResults>
        }

        if (this.state.loading) { component = <LoadingSpinner />; }

        return component;
    }

    private performSearch(q?: string, options?: ISearchOptions) {
        this.setState({loading: true});
        const query = q || null;

        this.props.seriesApi.searchSeries(query, options)
            .then((responseResult: ISearchResponse) => {
                if (this.props.q && this.props.q !== query) { return } // prevent show old data on slow networks

                if (this.props.dispatch) {
                    this.props.dispatch(setSourceFilters(responseResult.aggregations));
                }

                this.setState({
                    count: responseResult.count,
                    loading: false,
                    result: responseResult.result,
                    searched: true
                })
            }).catch(alert);
    }

    private pageCount(): number {
        const count = this.state.count;
        const pageSize = 10; // TODO: Parametrizar el tamaño de página como parte de la inicialización de TSExplorer

        return Math.floor(count / pageSize) + Math.min(count % pageSize, 1);
    }

    private getOffsetByPage(pageNumber: number): number {
        return Math.max(0, (pageNumber + 1) * 10 - 10);
    }

    private clearResults() {
        this.setState({result: []});
    }
}


function queryChanged(prevQuery: ISearcherProps, newQuery: ISearcherProps): boolean {
    return prevQuery.q              !== newQuery.q ||
            prevQuery.datasetTheme  !== newQuery.datasetTheme ||
            prevQuery.datasetSource !== newQuery.datasetSource ||
            prevQuery.offset        !== newQuery.offset ||
            prevQuery.limit         !== newQuery.limit ||
            prevQuery.publisher     !== newQuery.publisher ||
            prevQuery.units         !== newQuery.units ||
            prevQuery.catalogId     !== newQuery.catalogId
}