import * as React from "react";
import {ApiClient} from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import {ISerie} from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import Graphic from "../viewpage/graphic/Graphic";


export interface IGraphicExportableProps {
    serieIds: string[];
    seriesApiUri: string;
    chartOptions: any;
}

export default class GraphicExportable extends React.Component<IGraphicExportableProps, any> {

    private seriesApi: SerieApi;

    public constructor(props: any) {
        super(props);
        this.seriesApi = new SerieApi(new ApiClient(this.props.seriesApiUri));
        this.state = {
            series: []
        }
    }

    public componentDidMount() {
        const params = new QueryParams(this.props.serieIds);
        this.fetchSeries(params);
    }

    public render() {
        return (
            <Graphic series={this.state.series} range={{min: 0, max: 0}} seriesConfig={[]} chartOptions={this.props.chartOptions}/>
        )
    }

    private fetchSeries(params: QueryParams) {
        this.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => this.setState({series}))
            .catch(alert);
    }

}