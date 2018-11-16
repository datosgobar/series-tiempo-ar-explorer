import * as React from 'react';
import QueryParams from "../../../api/QueryParams";
import SearchResult from "../../../api/SearchResult";
import {ISerie} from "../../../api/Serie";
import {ISerieApi} from "../../../api/SerieApi";
import LinkedSerieCardWithChart from "../../style/Card/Serie/LinkedSerieCardWithChart";


interface ISearcherResultsWithSeriesProps {
    searchResults: SearchResult[];
    seriesApi: ISerieApi;
}

interface ISearcherResultsWithSeriesState {
    series: ISerie[];
}

export default class SearcherResultsWithChart extends React.Component<ISearcherResultsWithSeriesProps, ISearcherResultsWithSeriesState> {

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
                    return <LinkedSerieCardWithChart key={serie.id} serie={serie} />;
                })}
            </div>
        )
    }

    private performFetchSeries() {
        this.props.searchResults.forEach((result: SearchResult) => {
            const params = new QueryParams([result.id]);
            params.setLast(24);
            this.props.seriesApi.fetchSeries(params).then((series: ISerie[]) => {
                this.setState({series: Array.from(this.state.series).concat(series)})
            });
        })
    }
}
