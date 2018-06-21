import * as React from 'react';

import SeriesPickerCard, { ISeriesPickerCardProps } from '../../style/Card/SeriesPickerCard';

import { ISerie } from '../../../api/Serie';
import { ISearchResultItem, ISerieApi } from '../../../api/SerieApi';
import initialState from '../../../store/initialState';
import FullSearcher from '../../common/searcher/FullSearcher';


interface ISeriesPickerProps {

    seriesApi: ISerieApi;
    checkedSeries?: ISerie[];
    onPick: (event: React.MouseEvent<HTMLElement>, serieId: string) => void;
}

class SeriesPicker extends React.Component<ISeriesPickerProps, any> {

    constructor(props: ISeriesPickerProps, context: any) {
        super(props, context);

        this.renderPickeableItems = this.renderPickeableItems.bind(this);
        this.searchResultCardProps = this.searchResultCardProps.bind(this);
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

        return (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            this.props.onPick(event, pickedSerieId);
        }
    }

    public searchResultCardProps(searchResult: ISearchResultItem): ISeriesPickerCardProps{
        return {
            checked: this.props.checkedSeries && (this.props.checkedSeries.map(serie => serie.id).indexOf(searchResult.id) >= 0),
            onClick: this.handlePick(searchResult.id),
            pegcolor: "red",
            searchResult,
        }
    }

    public renderPickeableItems(searchResults: ISearchResultItem[]): JSX.Element {
        return (
            <div className="dp-results">
                {searchResults.map((searchResult: ISearchResultItem) =>
                    <SeriesPickerCard 
                    key={searchResult.id}
                    {...this.searchResultCardProps(searchResult)} />
                )}
            </div>
        );
    }
}


export default SeriesPicker;
