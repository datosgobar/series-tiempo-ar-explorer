import * as React from "react";
import {ApiClient} from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import {ISerie} from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import Graphic from "../viewpage/graphic/Graphic";
import {chartExtremes} from "../viewpage/graphic/GraphicAndShare";


export interface IGraphicExportableProps {
    graphicUrl: string;
    seriesApiUri: string;
    chartOptions: any;
    navigator: boolean;
}

interface IGraphicExportableState {
    series: ISerie[];
    dateRange: { start: string, end: string };
}

export default class GraphicExportable extends React.Component<IGraphicExportableProps, IGraphicExportableState> {

    private seriesApi: SerieApi;

    public constructor(props: any) {
        super(props);
        this.seriesApi = new SerieApi(new ApiClient(this.props.seriesApiUri));
        this.state = {
            dateRange: { start: '', end: '' },
            series: []
        }
    }

    public componentDidMount() {
        const url = new URLSearchParams(this.props.graphicUrl);
        const ids = extractIdsFromUrl(this.props.graphicUrl);
        const params = new QueryParams(ids);

        if (this.props.navigator) {
            url.delete('start_date');
            url.delete('end_date');
        } else {
            const start = url.get('start_date') || '';
            const end = url.get('end_date') || '';
            params.setStartDate(start);
            params.setEndDate(end);

            this.setState({dateRange: {start, end}})
        }

        params.extractParams(url);
        this.fetchSeries(params);
    }

    public render() {
        return (
            <Graphic series={this.state.series}
                     range={chartExtremes(this.state.series, this.state.dateRange)}
                     seriesConfig={[]}
                     chartOptions={this.props.chartOptions} />
        )
    }

    private fetchSeries(params: QueryParams) {
        this.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => this.setState({series}))
            .catch(alert);
    }

}

function extractIdsFromUrl(url: string): string[] {
    return url.split('ids=')[1].split('&')[0].split(',')
}
