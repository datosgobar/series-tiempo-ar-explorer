import * as React from "react";

import * as ReactPaginate from "react-paginate";
import {ISearchResponse} from "../../../api/ITSAPIResponse";
import SearchResult from "../../../api/SearchResult";
import {ISearchOptions, ISerieApi} from "../../../api/SerieApi";
import SearchResultCount from "../../style/Common/searchpage/SearchResultCount";


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
    count: number;
    currentPage: number;
    result: SearchResult[];
}

export default class Searcher extends React.Component<ISearcherProps, ISearcherState> {

    constructor(props: ISearcherProps) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.state = {
            count: 0,
            currentPage: 0,
            result: []
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

        if (!this.props.q) {
            return;
        }

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
        return (
            <div>
                <div className="title-and-tags mg-b">
                    <SearchResultCount totalResult={this.state.count}/>
                </div>
                {this.props.renderSearchResults(this.state.result)}
                <ReactPaginate previousLabel={"Anterior"}
                               nextLabel={"Siguiente"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.pageCount()}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               activeClassName={"active"}
                               forcePage={this.state.currentPage} />
            </div>
        );
    }

    private performSearch(q: string, options?: ISearchOptions) {
        this.props.seriesApi.searchSeries(q, options)
            .then((responseResult: ISearchResponse) => {
                this.setState({
                    count: responseResult.count,
                    result: responseResult.result
                });
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
