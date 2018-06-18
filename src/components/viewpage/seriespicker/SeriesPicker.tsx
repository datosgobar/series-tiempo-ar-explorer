import * as React from 'react';

import { ISearchResultItem, ISerieApi } from '../../../api/SerieApi';
import initialState from '../../../store/initialState';
import FullSearcher from '../../common/searcher/FullSearcher';


interface ISeriesPickerProps {

    seriesApi: ISerieApi;
    onPick: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void;
}

class SeriesPicker extends React.Component<ISeriesPickerProps, any> {

    constructor(props: ISeriesPickerProps, context: any) {
        super(props, context);

        this.renderPickeableItems = this.renderPickeableItems.bind(this);
    }

    public render() {
        return (
            <FullSearcher
                seriesApi={this.props.seriesApi}
                datasetTheme={initialState.searchParams.datasetTheme}
                datasetSource={initialState.searchParams.datasetSource}
                limit={initialState.searchParams.limit}
                offset={initialState.searchParams.offset}
                q={initialState.searchParams.q}
                renderSearchResults={this.renderPickeableItems} />
        );
    }

    public handlePick(pickedSerieId: string) {

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
