import * as React from 'react';
import { connect } from 'react-redux';

import './SeriesPicker.css';

import { setSearchParams } from '../../../actions/searchActions';
import { ISearchResultItem, ISerieApi } from '../../../api/SerieApi';
import initialState from '../../../store/initialState';
import Searcher from '../../common/searcher/Searcher';

interface ISeriesPickerProps {

    seriesApi: ISerieApi;
    onPick: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void;
    dispatch?: any;
}

class SeriesPicker extends React.Component<ISeriesPickerProps, any> {

    constructor(props: ISeriesPickerProps, context: any) {
        super(props, context);

        this.handleSearch = this.handleSearch.bind(this);
        this.renderPickeableItems = this.renderPickeableItems.bind(this);
    }

    public handleSearch(q: string, datasetSource:string, offset: number, limit: number): void {
        this.props.dispatch(setSearchParams({q, datasetSource, offset, limit}));
    }

    public render() {
        return (
            <Searcher
                seriesApi={this.props.seriesApi}
                datasetSource={initialState.searchParams.datasetSource}
                limit={initialState.searchParams.limit}
                offset={initialState.searchParams.offset}
                q={initialState.searchParams.q}
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


export default connect()(SeriesPicker);
