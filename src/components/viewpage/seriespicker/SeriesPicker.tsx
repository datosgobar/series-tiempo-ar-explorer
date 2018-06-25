import * as React from 'react';

import SeriesPickerCard, { ISeriesPickerCardProps } from '../../style/Card/SeriesPickerCard';

import { ISearchResultItem, ISerieApi } from '../../../api/SerieApi';
import initialState from '../../../store/initialState';
import FullSearcher from '../../common/searcher/FullSearcher';


export interface ISeriesPickerProps {

    seriesApi: ISerieApi;
    onPick: (event: React.MouseEvent<HTMLElement>, serieId: string) => void;
    isChecked?: (serieId: string) => boolean;
    pegColorFor?: (serieId: string) => string;
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
            checked: this.props.isChecked && this.props.isChecked(searchResult.id),
            onClick: this.handlePick(searchResult.id),
            pegcolor: this.props.pegColorFor? this.props.pegColorFor(searchResult.id) : undefined,
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
