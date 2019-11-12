import * as React from 'react';
import {connect} from "react-redux";
import QueryParams from "../../../api/QueryParams";
import SearchResult from "../../../api/SearchResult";
import {ISerie} from "../../../api/Serie";
import {ISerieApi} from "../../../api/SerieApi";
import {IStore} from "../../../store/initialState";
import {ILapsProps} from "../../mainpage/featured/Featured";
import LinkedSerieCardWithChart from "../../style/Card/Serie/LinkedSerieCardWithChart";


interface ISearcherResultsWithSeriesProps {
    searchResults: SearchResult[];
    seriesApi: ISerieApi;
    laps: ILapsProps;
    maxDecimals: number;
    numbersAbbreviate: boolean;
    decimalsBillion: number;
    decimalsMillion: number;
    locale: string;
}

interface ISearcherResultsWithSeriesState {
    series: ISerie[];
}

class SearcherResultsWithChart extends React.Component<ISearcherResultsWithSeriesProps, ISearcherResultsWithSeriesState> {

    public constructor(props: ISearcherResultsWithSeriesProps) {
        super(props);

        this.state = {
            series: []
        }
    }

    public componentDidMount() {
        this.performFetchSeries();
    }

    public render() {
        return (
            <div>
                {this.props.searchResults.map((result: SearchResult) => {
                    const serie = this.state.series.find((s: ISerie) => s.id === result.id) || result;
                    return <LinkedSerieCardWithChart key={serie.id} 
                                                     serie={serie} 
                                                     maxDecimals={this.props.maxDecimals} 
                                                     numbersAbbreviate={this.props.numbersAbbreviate}
                                                     decimalsBillion={this.props.decimalsBillion}
                                                     decimalsMillion={this.props.decimalsMillion}
                                                     locale={this.props.locale} />;
                })}
            </div>
        )
    }

    private performFetchSeries() {
        this.props.searchResults.forEach((result: SearchResult) => {
            const params = new QueryParams([result.id]);
            params.setLast(this.props.laps[result.accrualPeriodicity]);
            this.props.seriesApi.fetchSeries(params).then((series: ISerie[]) => {
                this.setState({series: Array.from(this.state.series).concat(series)})
            });
        })
    }
}


function mapStateToProps(state: IStore) {
    return {
        laps: state.laps,
    };
}


export default connect(mapStateToProps)(SearcherResultsWithChart);
