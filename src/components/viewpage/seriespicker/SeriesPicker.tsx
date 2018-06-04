import * as React from 'react';

import './SeriesPicker.css';

import { ISearchResultItem, ISerieApi } from '../../../api/SerieApi';
import Searcher from '../../common/searcher/Searcher';

interface ISeriesPickerProps {

    seriesApi: ISerieApi;
    onPick: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void;
}

interface ISeriesPickerState {

    q: string;
    offset: number;
    limit: number;
}

class SeriesPicker extends React.Component<ISeriesPickerProps, ISeriesPickerState> {

    constructor(props: ISeriesPickerProps, context: any) {
        super(props, context);

        this.state = { q: "", offset: 0, limit: 4 };

        this.handleSearch = this.handleSearch.bind(this);
        this.renderPickeableItems = this.renderPickeableItems.bind(this);
    }

    public handleSearch(q: string, offset: number, limit: number): void {
        this.setState({ q, offset, limit })
    }

    public render() {
        return (
            <Searcher
                seriesApi={this.props.seriesApi}
                limit={this.state.limit}
                offset={this.state.offset}
                q={this.state.q}
                onWillSearch={this.handleSearch}
                renderSearchResults={this.renderPickeableItems} />
        );
    }

    public handlePick(pickedSerieId: string){

        return (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            this.props.onPick(event, pickedSerieId);
        }
    }

    public renderPickeableItems(searchResults: ISearchResultItem[]): JSX.Element {
        return (
            <div className="SearchResults">
                {searchResults.map((searchResult: ISearchResultItem) =>
                    <div className="Pickeable" key={searchResult.id}>
                        <h6>{searchResult.title}</h6>
                        <p>{searchResult.description}</p>
                        <a href='#' onClick={this.handlePick(searchResult.id)}>add</a>
                    </div>
                )}
            </div>
        );
    }
}


export default SeriesPicker;