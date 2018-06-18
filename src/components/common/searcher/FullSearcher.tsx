import * as React from "react";

import { ISearchResultItem, ISerieApi } from "../../../api/SerieApi";
import SearchBox from "../../common/searchbox/SearchBox";
import Searcher, { ISearcherProps, ISearchParams } from "./Searcher";


interface IFullSearcherProps extends ISearchParams {

    seriesApi: ISerieApi;

    renderSearchResults: (searchResults: ISearchResultItem[]) => JSX.Element | JSX.Element[];
}

export default class FullSearcher extends React.Component<IFullSearcherProps, ISearchParams> {

    constructor(props: IFullSearcherProps) {
        super(props);

        this.state = {
            datasetSource: this.props.datasetSource,
            datasetTheme: this.props.datasetTheme,
            limit: this.props.limit,
            offset: this.props.offset,
            q: this.props.q,
        }

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
                <SearchBox seriesApi={this.props.seriesApi} searchTerm={this.props.q} onSearch={this.search} />

                <Searcher {...this.searcherProps()}/>
            </div>
        );
    }
}
