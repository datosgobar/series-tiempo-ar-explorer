import * as React from "react";

import { ISearchResultItem, ISerieApi } from "../../../api/SerieApi";
import initialState from "../../../store/initialState";
import SearchBox from "../../common/searchbox/SearchBox";
import { ISearcherProps, ISearchParams, Searcher } from "./Searcher";


interface IFullSearcherProps extends ISearchParams {

    seriesApi: ISerieApi;

    renderSearchResults: (searchResults: ISearchResultItem[]) => JSX.Element | JSX.Element[];
}

export class FullSearcher extends React.Component<IFullSearcherProps, ISearchParams> {

    constructor(props: IFullSearcherProps) {
        super(props);

        this.state = {...initialState.searchParams}

        this.search = this.search.bind(this);
    }

    public search(q?: string, datasetSource?: string, datasetTheme?:string, offset?: number, limit?: number) {

        if (!q) {
            return;
        }

        datasetSource = datasetSource || this.props.datasetSource;
        offset = offset || this.props.offset;
        limit = limit || this.props.limit;
        datasetTheme = datasetTheme || this.props.datasetTheme;

        this.setState({q, datasetSource, datasetTheme, offset, limit});
    }

    public searcherProps(): ISearcherProps {
        return ({
            ...this.state,
            renderSearchResults: this.props.renderSearchResults,
            seriesApi: this.props.seriesApi,
        });
    }

    public render() {
        return (
            <div className="Searcher">
                <SearchBox searchTerm={this.props.q} onSearch={this.search} />

                <Searcher {...this.searcherProps()}/>
            </div>
        );
    }
}

export default FullSearcher;
