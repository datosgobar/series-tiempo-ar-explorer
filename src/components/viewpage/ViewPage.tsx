import { Location } from 'history';
import * as moment from "moment";
import * as React from 'react';
import { connect } from 'react-redux';
import { RouterProps, withRouter } from "react-router";

import ClearFix from '../style/ClearFix';
import Colors, { Color } from '../style/Colors/Color';
import Container from '../style/Common/Container';
import SeriesHero from '../style/Hero/SeriesHero';
import AddAndCustomizeSeriesButton from './AddAndCustomizeSeriesButton';
import SeriesTags from './SeriesTags'

import {clearViewSeries, loadViewSeries, setDate} from '../../actions/seriesActions';
import { IDateRange } from "../../api/DateSerie";
import QueryParams from "../../api/QueryParams";
import { ISerie } from '../../api/Serie';
import { ISerieApi } from '../../api/SerieApi';
import SearchBox from '../common/searchbox/SearchBox'
import DetallePanel from './DetallePanel';
import GraphicAndShare from "./graphic/GraphicAndShare";
import MetaData from './metadata/MetaData';
import SeriesPicker, { ISeriesPickerProps } from './seriespicker/SeriesPicker';

interface IViewPageProps extends RouterProps {
    series: ISerie[];
    seriesApi: ISerieApi;
    date: IDateRange
    readonly location: { search: string };
    readonly dispatch: (action: object) => void;
}

export class ViewPage extends React.Component<IViewPageProps, any> {

    private unlisten: (() => void);

    constructor(props: IViewPageProps, context: any) {
        super(props, context);

        this.onSeriesFetchedSuccess = this.onSeriesFetchedSuccess.bind(this);
        this.onSeriesFetchError = this.onSeriesFetchError.bind(this);
        this.handleUriChange = this.handleUriChange.bind(this);
        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.redirectToViewPage = this.redirectToViewPage.bind(this);
        this.removeSerie = this.removeSerie.bind(this);
        this.seriesPickerProps = this.seriesPickerProps.bind(this);
        this.isChecked = this.isChecked.bind(this);
        this.addPickedSerie = this.addPickedSerie.bind(this);
        this.colorFor = this.colorFor.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
        this.removeDateParams = this.removeDateParams.bind(this);
        this.state = {
            lastSuccessfulUrl: this.getQueryParams()
        }
    }

    public shouldComponentUpdate(nextProps: IViewPageProps) {
        return this.props.series.every((serie1: ISerie) => {
            return nextProps.series.every((serie2: ISerie) => serie1.id !== serie2.id)
        });
    }

    public viewSeries(ids: string[]) {
        const params = this.getQueryParams();
        params.set('ids', ids.join(','));
        params.delete('collapse');
        params.delete('collapse_aggregation');

        this.setQueryParams(params);
    }

    public getQueryParams(): URLSearchParams {
        return new URLSearchParams(this.props.location.search);
    }

    public setQueryParams(params: URLSearchParams) {
        const queryString = params.toString()
            .replace(new RegExp('%2C', 'g'), ',')
            .replace(new RegExp('%3A', 'g'), ':');

        this.props.history.push("/series/?" + queryString);
    }

    public addPickedSerie(event: React.MouseEvent<HTMLButtonElement>, serieId: string) {
        const ids = getIDs(this.props.location as Location).concat(serieId);
        this.viewSeries(ids);
    }

    public removeSerie(event: React.MouseEvent<HTMLButtonElement>, serieId: string) {
        const ids = getIDs(this.props.location as Location).filter((val) => serieIdSanitizer(val) !== serieId);
        if (ids.length) {
            this.viewSeries(ids);
        }
    }

    public handleChangeDate(date: {start: string, end: string}) {
        this.props.dispatch(setDate(date));
        this.changeDateInUrl(date);
    }

    public handleChangeFrequency(value: string) {
        const params = this.getQueryParams();
        params.set('collapse', value);
        params.set('collapse_aggregation', 'avg');
        this.setQueryParams(params);
    }

    public redirectToSearchPage(searchTerm: string) {
        this.props.history.push('/search/?q=' + searchTerm);
    }

    public redirectToViewPage(serieId: string) {
        this.props.history.push('/series/?ids=' + serieId);
    }

    public render() {
        return (
            <section id="detalle">
                <SeriesHero compact={true} searchBox={<SearchBox seriesApi={this.props.seriesApi} onSearch={this.redirectToSearchPage} onSelect={this.redirectToViewPage} />} />
                <div id="detalle-content">
                    <Container>
                        <div className="row mg-t">
                            <AddAndCustomizeSeriesButton />
                            <SeriesTags series={this.props.series} onTagClose={this.removeSerie} pegColorFor={this.colorFor} />
                        </div>
                        <div className="col-sm-6">
                            <ClearFix />
                        </div>
                        <GraphicAndShare series={this.props.series}
                                         colorFor={this.colorFor}
                                         date={this.props.date}
                                         handleChangeDate={this.handleChangeDate}
                                         handleChangeFrequency={this.handleChangeFrequency}
                                         onReset={this.removeDateParams}
                                         url={this.downloadDataURL()} />
                        <MetaData series={this.props.series} onRemove={this.removeSerie} pegColorFor={this.colorFor} />
                    </Container>
                    <DetallePanel seriesPicker={ <SeriesPicker {...this.seriesPickerProps()} /> } />
                </div>
            </section>
        );
    }

    public seriesPickerProps(): ISeriesPickerProps {
        return {
            isChecked: this.isChecked,
            onPick: this.addPickedSerie,
            pegColorFor: this.colorFor,
            seriesApi: this.props.seriesApi,
        }
    }

    public isChecked(serieId: string): boolean {
        return this.props.series.map(serie => serie.id).indexOf(serieId) >= 0;
    }

    public colorFor(serie: ISerie): Color {
        const colors = (Object as any).values(Colors);
        const index = this.props.series.findIndex(viewSerie => viewSerie.id === serie.id) % colors.length;

        return colors[index];
    }

    public componentDidMount() {
        this.unlisten = this.props.history.listen(l => {  // se subscribe
            if (QueryParams.distinctURLs(this.props.location.search, l.search)) {
                this.handleUriChange(l)
            }
        });
        this.handleUriChange(this.props.location as Location);
    }

    public componentWillUnmount() {
        this.unlisten(); // se dessubscribe
        this.props.dispatch(clearViewSeries());
    }

    public onSeriesFetchedSuccess(series: ISerie[]) {
        this.setState({ lastSuccessQueryParams: this.getQueryParams() });
        this.props.dispatch(loadViewSeries(series));
    }

    private onSeriesFetchError(error: any) {
        alert(error.response.data.errors[0].error);
        this.setQueryParams(this.state.lastSuccessQueryParams); // rollback to the last successful state
    }

    private handleUriChange(location: Location) {
        const ids = getIDs(location);

        if (ids.length === 0) { return }

        this.props.dispatch(setDate(getDateFromUrl(location)));

        const idsWoDuplicates = removeDuplicates(ids);
        if (idsWoDuplicates.length < ids.length) {
            this.viewSeries(idsWoDuplicates);
            return
        }

        this.props.dispatch(clearViewSeries()); // clear cached series
        this.setParamsAndFetch(ids, location);
    }

    private setParamsAndFetch(ids: string[], location: Location) {
        const queryParams = new QueryParams(ids);
        queryParams.extractParams(getParamsFromUrl(location));

        this.fetchSeries(queryParams);
    }

    private fetchSeries(params: QueryParams) {
        this.props.seriesApi.fetchSeries(params)
            .then(this.onSeriesFetchedSuccess)
            .catch(this.onSeriesFetchError);
    }

    private downloadDataURL(): string {
        const ids = this.getQueryParams().getAll('ids');
        if (ids.length === 0 || this.props.series.length === 0) { return ''; }

        const location = this.props.location as Location;
        const startDate = getParamsFromUrl(location).get('start_date') || '';
        const endDate = getParamsFromUrl(location).get('end_date') || '';

        const queryParams = new QueryParams(ids);
        queryParams.extractParams(getParamsFromUrl(location));
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

    private changeDateInUrl(date: {start: string, end: string}) {
        const params = this.getQueryParams();
        this.setDateParam(params, date);
        this.setQueryParams(params);
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

    private removeDateParams() {
        const params = this.getQueryParams();
        if (params.get('start_date') === null && params.get('end_date') === null) { return }

        params.delete('start_date');
        params.delete('end_date');
        this.setQueryParams(params);
        this.props.dispatch(setDate({ start: '', end: '' }));
    }

}

function mapStateToProps(state: any, ownProps: any) {
    return {
        date: state.date,
        series: state.viewSeries,
        seriesApi: state.seriesApi,
    };
}

function getIDs(location: Location): string[] {
    const params = new URLSearchParams(location.search);

    let ids = params.getAll('ids');
    ids = ids.length ? ids.join(',').split(',') : [];

    return ids;
}

function getDateFromUrl(location: Location): IDateRange {
    const params = getParamsFromUrl(location);
    const start = params.get('start_date') || '';
    const end = params.get('end_date') || '';

    return { start, end };
}

function getParamsFromUrl(location: Location): URLSearchParams {
    return new URLSearchParams(location.search);
}

function removeDuplicates(arr: any[]) {
    return Array.from(new Set(arr));
}

function serieIdSanitizer(serieId: string): string {
    return serieId.split(':')[0];
}

export default withRouter(connect(mapStateToProps)(ViewPage as any));
