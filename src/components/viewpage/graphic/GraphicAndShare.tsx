import { Location } from 'history';
import * as moment from "moment";
import * as React from 'react';
import { connect } from "react-redux";
import { setDate } from "../../../actions/seriesActions";
import ChartTypeSelector from '../../../api/ChartTypeSelector';
import { IDataPoint } from "../../../api/DataPoint";
import { IDateRange } from "../../../api/DateSerie";
import QueryParams from '../../../api/QueryParams';
import { ISerie } from "../../../api/Serie";
import { ISerieApi } from "../../../api/SerieApi";
import SerieConfig from "../../../api/SerieConfig";
import { formattedMoment, localTimestamp } from "../../../helpers/common/dateFunctions";
import { IStore } from "../../../store/initialState";
import GraphContainer from "../../style/Graphic/GraphContainer";
import { getQueryParams } from '../ViewPage';
import Graphic, { IChartExtremeProps } from "./Graphic";
import GraphicComplements from "./GraphicComplements";


export interface IGraphicAndShareProps {
    series: ISerie[];
    date: IDateRange;
    updateParamsInUrl: (params: URLSearchParams) => void;
    readonly dispatch: (action: object) => void;
    seriesConfig: (series: ISerie[]) => SerieConfig[];
    formatUnits: boolean;
    locale: string;
    readonly location: { search: string };
    seriesApi: ISerieApi;
    maxDecimals: number;
}

class GraphicAndShare extends React.Component<IGraphicAndShareProps, any> {

    constructor(props: IGraphicAndShareProps) {
        super(props);
        this.handleZoom = this.handleZoom.bind(this);
        this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
        this.handleChangeUnits = this.handleChangeUnits.bind(this);
        this.handleChangeAggregation = this.handleChangeAggregation.bind(this);
        this.removeDateParams = this.removeDateParams.bind(this);

        this.state = {
            chartType: {}
        }
    }

    public handleZoom(extremes: IChartExtremeProps) {
        if (this.props.series.length === 0) { return }

        const start = findSerieDate(this.props.series, extremes.min);
        const end = findSerieDate(this.props.series, extremes.max);
        const date = { start: formattedMoment(start), end: formattedMoment(end) };

        const params = getQueryParams(this.props.location);
        this.setDateParam(params, date);
        this.props.dispatch(setDate(date));

        this.props.updateParamsInUrl(params);
    }

    public handleChangeFrequency(value: string) {
        const params = getQueryParams(this.props.location);
        params.set('collapse', value);
        params.set('collapse_aggregation', 'avg');

        this.props.updateParamsInUrl(params);
    }

    public handleChangeUnits(value: string) {
        const params = getQueryParams(this.props.location);
        params.set('representation_mode', value);

        this.props.updateParamsInUrl(params);
    }

    public handleChangeAggregation(value: string) {
        const params = getQueryParams(this.props.location);
        params.set('collapse_aggregation', value);

        this.props.updateParamsInUrl(params);
    }

    public render() {
        return (
            <GraphContainer>
                <Graphic series={this.props.series}
                         seriesConfig={this.props.seriesConfig(this.props.series)}
                         formatUnits={this.props.formatUnits}
                         range={chartExtremes(this.props.series, this.props.date)}
                         onReset={this.removeDateParams}
                         onZoom={this.handleZoom}
                         dispatch={this.props.dispatch}
                         locale={this.props.locale}
                         chartTypes={this.generateChartTypes()}
                         maxDecimals={this.props.maxDecimals} />

                <GraphicComplements url={this.downloadDataURL()}
                                    series={this.props.series}
                                    handleChangeFrequency={this.handleChangeFrequency}
                                    handleChangeUnits={this.handleChangeUnits}
                                    handleChangeAggregation={this.handleChangeAggregation} />
            </GraphContainer>
        )
    }

    private removeDateParams() {
        const params = getQueryParams(this.props.location);
        if (params.get('start_date') === null && params.get('end_date') === null) { return }

        params.delete('start_date');
        params.delete('end_date');
        this.props.dispatch(setDate({ start: '', end: '' }));

        this.props.updateParamsInUrl(params);
    }

    private downloadDataURL(): string {
        const ids = getQueryParams(this.props.location).getAll('ids');
        if (ids.length === 0 || this.props.series.length === 0) { return ''; }

        const location = this.props.location as Location;
        const startDate = getQueryParams(location).get('start_date') || '';
        const endDate = getQueryParams(location).get('end_date') || '';

        const queryParams = new QueryParams(ids);
        queryParams.addParamsFrom(getQueryParams(location));
        queryParams.setChartType(getQueryParams(location).get('chartType')||'line');
        if (this.validStartDateFilter(startDate)) { queryParams.setStartDate(startDate) }
        if (this.validEndDateFilter(endDate)) { queryParams.setEndDate(endDate) }

        return this.props.seriesApi.downloadDataURL(queryParams);
    }

    private validStartDateFilter(startDate: string): boolean {
        const firstSeriesDate = moment(this.props.series[0].data[0].date);

        return moment(startDate).isValid() && moment(startDate).isAfter(firstSeriesDate);
    }

    private validEndDateFilter(endDate: string): boolean {
        const lastSeriesDate = moment(this.props.series[0].data[this.props.series[0].data.length - 1].date);

        return moment(endDate).isValid() && moment(endDate).isBefore(lastSeriesDate);
    }

    private setDateParam(params: any, date: any) {
        const firstSerieData = this.props.series[0].data[0];
        const lastSerie = this.props.series[this.props.series.length - 1];
        const lastSerieData = lastSerie.data[lastSerie.data.length - 1];

        if (firstSerieData.date === date.start) {
            params.delete('start_date');
        } else {
            params.set('start_date', date.start);
        }

        if (lastSerieData.date === date.end) {
            params.delete('end_date');
        } else {
            params.set('end_date', date.end);
        }
    }

    private generateChartTypes(): any {
        const params = getQueryParams(this.props.location);
        const chartTypeSelector = new ChartTypeSelector(this.props.series, params)
        return chartTypeSelector.getChartTypesBySeries();
    }

}

// returns the date matching with the passed timestamp if the date exists
function findSerieDate(series: ISerie[], timestamp: number): string {
    const firstSerieData = series[0].data;
    const serieData = firstSerieData.find((data) => data.date >= formattedMoment(localTimestamp(timestamp)));
    return serieData !== undefined ? serieData.date : '';
}


export function chartExtremes(series: ISerie[], dateRange: { start: string, end: string }): IChartExtremeProps {
    if (series.length === 0) {return {min: 0, max: 0}}

    const firstSerieData = series[0].data;
    let minDataIndex = firstSerieData.findIndex((data: IDataPoint) => data.date >= dateRange.start);
    let maxDataIndex = firstSerieData.findIndex((data: IDataPoint) => data.date >= dateRange.end);
    if (minDataIndex <= 0) { minDataIndex = 0 }
    if (maxDataIndex <= 0) { maxDataIndex = firstSerieData.length - 1}

    const min = new Date(firstSerieData[minDataIndex].date).getTime();
    const max = new Date(firstSerieData[maxDataIndex].date).getTime();

    return {min, max};
}


function mapStateToProps(state: IStore) {
    return {
        date: state.date,
        locale: state.locale,
        series: state.viewSeries
    };
}

export default connect(mapStateToProps, {})(GraphicAndShare);
