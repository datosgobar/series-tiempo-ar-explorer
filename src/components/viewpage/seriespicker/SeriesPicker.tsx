import * as React from 'react';

import SearchResult from '../../../api/SearchResult';
import { ISerieApi } from '../../../api/SerieApi';
import initialState from '../../../store/initialState';
import FullSearcher from '../../common/searcher/FullSearcher';
import SerieCard from '../../style/Card/Serie/SerieCard';
import Color from '../../style/Colors/Color';


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

    public searchResultCardProps(searchResult: SearchResult) {
        return {
            checked: this.props.isChecked && this.props.isChecked(searchResult.id),
            onClick: this.handlePick(searchResult.id),
            pegColor: this.props.pegColorFor ? this.props.pegColorFor(searchResult.id) : Color.Violet,
            serie: searchResult,
        }
    }

    public renderPickeableItems(searchResults: SearchResult[]): JSX.Element {
        return (
            <div className="dp-results">
                {searchResults.map((searchResult: SearchResult) =>
                    <SerieCard
                        key={searchResult.id}
                        {...this.searchResultCardProps(searchResult)} />
                )}
            </div>
        );
    }
}


export default SeriesPicker;
