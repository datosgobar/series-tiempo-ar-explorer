import * as React from "react";

import SearchResult from "../../../api/SearchResult";
import {ISerieApi} from "../../../api/SerieApi";
import SearchBox from "../../common/searchbox/SearchBox";
import Searcher, {ISearcherProps, ISearchParams} from "./Searcher";
import Timer = NodeJS.Timer;


interface IFullSearcherProps extends ISearchParams {
    seriesApi: ISerieApi;
    renderSearchResults: (searchResults: SearchResult[]) => JSX.Element | JSX.Element[];
}

export default class FullSearcher extends React.Component<IFullSearcherProps, ISearchParams> {
    private timer: Timer;

    constructor(props: IFullSearcherProps) {
        super(props);

        this.state = {
            datasetSource: this.props.datasetSource,
            datasetTheme: this.props.datasetTheme,
            limit: this.props.limit,
            offset: this.props.offset,
            q: this.props.q,
        };

        this.onSearchTermPicked = this.onSearchTermPicked.bind(this);
        this.onSourcePicked = this.onSourcePicked.bind(this);
        this.onThemePicked = this.onThemePicked.bind(this);
    }

    public searcherProps(): ISearcherProps {
        return ({
            ...this.state,
            renderSearchResults: this.props.renderSearchResults,
            seriesApi: this.props.seriesApi,
        });
    }

    public onSearchTermPicked(q: string){
        clearTimeout(this.timer);

        this.timer = setTimeout(() => this.setState({q}),500)
    }

    public onSourcePicked(datasetSource: string): void{
        this.setState({datasetSource});
    }

    public onThemePicked(datasetTheme: string): void {
        this.setState({datasetTheme});
    }

    public render() {
        return (
            <div className="Searcher">
                <SearchBox seriesApi={this.props.seriesApi}
                           searchTerm={this.props.q}
                           onSearch={this.onSearchTermPicked}
                           onSelect={this.onSearchTermPicked}
                           enterRequired={false} />
                <Searcher {...this.searcherProps()} />
            </div>
        );
    }
}
