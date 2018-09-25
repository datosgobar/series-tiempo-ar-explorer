import * as React from "react";

import {ISearchResponse} from "../../../api/ITSAPIResponse";
import SearchResult from "../../../api/SearchResult";
import {ISearchOptions, ISerieApi} from "../../../api/SerieApi";
import LoadingSpinner from "../LoadingSpinner";
import InitialSearcher from "./InitialSearcher";
import SearcherResults from "./SearcherResults";


export interface ISearchParams {
    datasetSource: string;
    datasetTheme: string;
    limit: number;
    offset: number;
    q?: string;
}

export interface ISearcherProps extends ISearchParams {
    seriesApi: ISerieApi;
    renderSearchResults: (searchResults: SearchResult[]) => JSX.Element | JSX.Element[];
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
            datasetSource: params.datasetSource,
            datasetTheme: params.datasetTheme,
            limit: params.limit,
            offset: params.offset,
        }
    }

    public componentDidMount() {
        this.performSearch(this.props.q, this.searchOptions());
    }

    public componentDidUpdate(prevProps: ISearcherProps) {
        window.scrollTo(0, 0);

        if (this.props.q !== prevProps.q) {
            this.setState({ currentPage: 0 });
        }

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
