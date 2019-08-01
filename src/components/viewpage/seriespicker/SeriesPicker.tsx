import * as React from 'react';
import { connect } from "react-redux";
import SearchResult from '../../../api/SearchResult';
import { ISerie } from '../../../api/Serie';
import { ISerieApi } from '../../../api/SerieApi';
import initialState, { IStore } from '../../../store/initialState';
import FullSearcher from '../../common/searcher/FullSearcher';
import SerieCard from '../../style/Card/Serie/SerieCard';
import { colorFor } from '../../style/Colors/Color';


export interface ISeriesPickerProps {
    seriesApi: ISerieApi;
    onPick: (event: React.MouseEvent<HTMLElement>, serieId: string) => void;
    onRemoveSerie: (serieId: string) => void;
    series: ISerie[];
}

class SeriesPicker extends React.Component<ISeriesPickerProps, any> {

    constructor(props: ISeriesPickerProps, context: any) {
        super(props, context);

        this.renderPickeableItems = this.renderPickeableItems.bind(this);
        this.searchResultCardProps = this.searchResultCardProps.bind(this);
    }

    // Never update component. It avoids re render (and scrolling), but it could be a risk.
    // Refactor all nested components and, hopefully, it won't be needed.
    public shouldComponentUpdate() {
        return false;
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
                renderSearchResults={this.renderPickeableItems}
                publisher={initialState.searchParams.publisher}
                units={initialState.searchParams.units}
                catalogId={initialState.searchParams.catalogId} />
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
            checked: this.isChecked(searchResult.id),
            onClick: this.handlePick(searchResult.id),
            onRemoveSerie: () => this.props.onRemoveSerie(searchResult.id),
            pegColor: colorFor(this.props.series, searchResult.id),
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

    public isChecked(serieId: string): boolean {
        return this.props.series.map(serie => serie.id).indexOf(serieId) >= 0;
    }

}


function mapStateToProps(state: IStore) {
    return {
        series: state.viewSeries
    };
}

export default connect(mapStateToProps, {})(SeriesPicker);
