import * as React from "react";

import * as ReactPaginate from "react-paginate";
import {ISearchResponse} from "../../../api/ITSAPIResponse";
import SearchResult from "../../../api/SearchResult";
import {ISearchOptions, ISerieApi} from "../../../api/SerieApi";


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
    result: SearchResult[];
}

export default class Searcher extends React.Component<ISearcherProps, ISearcherState> {

    constructor(props: ISearcherProps) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.state = {
            count: 0,
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
        const newParams = {...this.props};
        newParams.offset = this.getOffsetByPage(btnClicked.selected);

        this.clearResults();
        this.performSearch(this.props.q, this.searchOptions(newParams));
    }

    public render() {
        return (
            <div>
                {this.props.renderSearchResults(this.state.result)}
                <ReactPaginate previousLabel={"Anterior"}
                               nextLabel={"Siguiente"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.state.count}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               activeClassName={"active"} />
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

    private getOffsetByPage(pageNumber: number): number {
        return Math.max(0, (pageNumber + 1) * 10 - 10);
    }

    private clearResults() {
        this.setState({result: []});
    }
}
