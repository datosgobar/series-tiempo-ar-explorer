import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouterProps, withRouter } from "react-router";
import { clearViewSeries, loadViewSeries, setDate } from '../../actions/seriesActions';
import { IDateRange } from "../../api/DateSerie";
import QueryParams from "../../api/QueryParams";
import { ISerie } from '../../api/Serie';
import { ISerieApi } from '../../api/SerieApi';
import SerieConfig from '../../api/SerieConfig';
import { getId, removeDuplicates } from "../../helpers/commonFunctions";
import { IStore } from '../../store/initialState';
import SearchBox from '../common/searchbox/SearchBox';
import ClearFix from '../style/ClearFix';
import Colors, { Color } from '../style/Colors/Color';
import Container from '../style/Common/Container';
import SeriesHero from '../style/Hero/SeriesHero';
import AddAndCustomizeSeriesButton from './AddAndCustomizeSeriesButton';
import DetallePanel from './DetallePanel';
import EmptySeries from "./EmptySeries";
import FailedSeries from "./FailedSeries";
import GraphicAndShare from "./graphic/GraphicAndShare";
import MetaData from './metadata/MetaData';
import SeriesPicker from './seriespicker/SeriesPicker';
import SeriesTags from './SeriesTags';

interface IViewPageProps extends RouterProps {
    seriesApi: ISerieApi;
    readonly location: { search: string };
    readonly dispatch: (action: object) => void;
    formatChartUnits?: boolean;
}

interface IViewPageState {
    emptySeries: string[];
    failedSeries: string[];
    lastSuccessQueryParams: URLSearchParams;
}

export class ViewPage extends React.Component<IViewPageProps, IViewPageState> {

    private unlisten: (() => void);

    constructor(props: IViewPageProps, context: any) {
        super(props, context);

        this.onSeriesFetchedSuccess = this.onSeriesFetchedSuccess.bind(this);
        this.onSeriesFetchError = this.onSeriesFetchError.bind(this);
        this.handleUriChange = this.handleUriChange.bind(this);
        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.redirectToViewPage = this.redirectToViewPage.bind(this);
        this.removeSerie = this.removeSerie.bind(this);
        this.addPickedSerie = this.addPickedSerie.bind(this);
        this.updateDateInUrl = this.updateDateInUrl.bind(this);
        this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
        this.handleChangeUnits = this.handleChangeUnits.bind(this);
        this.handleChangeAggregation = this.handleChangeAggregation.bind(this);
        this.removeDateParams = this.removeDateParams.bind(this);
        this.state = {
            emptySeries: [],
            failedSeries: [],
            lastSuccessQueryParams: getQueryParams(this.props.location),
        }
    }

    public viewSeries(ids: string[]) {
        const params = getQueryParams(this.props.location);
        params.set('ids', ids.join(','));
        params.delete('collapse');
        params.delete('collapse_aggregation');

        this.setQueryParams(params);
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

    public removeSerie(serieId: string) {
        const ids = getIDs(this.props.location as Location).filter((val) => serieIdSanitizer(val) !== serieId);
        if (ids.length) {
            this.viewSeries(ids);
        }
    }

    public updateDateInUrl(params: URLSearchParams) {
        this.setQueryParams(params);
    }

    public handleChangeFrequency(value: string) {
        const params = getQueryParams(this.props.location);
        params.set('collapse', value);
        params.set('collapse_aggregation', 'avg');
        this.setQueryParams(params);
    }

    public handleChangeUnits(value: string) {
        const params = getQueryParams(this.props.location);
        params.set('representation_mode', value);
        this.setQueryParams(params);
    }

    public handleChangeAggregation(value: string) {
        const params = getQueryParams(this.props.location);
        params.set('collapse_aggregation', value);
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
                        <FailedSeries ids={this.state.failedSeries} />
                        <EmptySeries ids={this.state.emptySeries} />
                        <div className="row mg-t">
                            <AddAndCustomizeSeriesButton />
                            <SeriesTags onTagClose={this.removeSerie} />
                        </div>
                        <div className="col-sm-6">
                            <ClearFix />
                        </div>
                        <GraphicAndShare seriesConfig={seriesConfigByUrl(this.props.location.search)}
                                         formatUnits={this.props.formatChartUnits || false}
                                         updateDateInUrl={this.updateDateInUrl}
                                         handleChangeFrequency={this.handleChangeFrequency}
                                         handleChangeUnits={this.handleChangeUnits}
                                         handleChangeAggregation={this.handleChangeAggregation}
                                         onReset={this.removeDateParams}
                                         dispatch={this.props.dispatch}
                                         location={this.props.location}
                                         seriesApi={this.props.seriesApi} />
                        <MetaData onRemove={this.removeSerie} />
                    </Container>
                    <DetallePanel seriesPicker={ <SeriesPicker onPick={this.addPickedSerie}
                                                                onRemoveSerie={this.removeSerie}
                                                                seriesApi={this.props.seriesApi} /> } />
                </div>
            </section>
        );
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
        queryParams.addParamsFrom(getQueryParams(location));

        this.fetchSeries(queryParams);
    }

    private fetchSeries(params: QueryParams) {
        this.props.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => this.onSeriesFetchedSuccess(params, series))
            .catch((response: any) => this.onSeriesFetchError(params, response));
    }

    private onSeriesFetchedSuccess(params: QueryParams, series: ISerie[]) {
        const ids = params.getIds().split(',');

        this.saveFailedSeries(ids, series);
        this.saveEmptySeries(series);
        this.saveLastSuccessQuery();

        this.props.dispatch(loadViewSeries(series.filter(serieWithData)));
    }

    private onSeriesFetchError(params: QueryParams, response: any) {
        const ids = params.getIds().split(',');
        if (ids.length && ids[0] === "") {
            alert("No se especificó una serie de tiempo");
        } else {
            this.saveFailedSeries(ids, []);
        }

        if (this.state.lastSuccessQueryParams) {
            this.setQueryParams(this.state.lastSuccessQueryParams); // rollback to the last successful state
        }
    }

    private saveFailedSeries(requestedIds: string[], series: ISerie[]) {
        if (requestedIds.length > series.length) {
            const foundSeries = series.map(getId);
            const failedSeries = requestedIds.filter((id: string) => foundSeries.indexOf(id) === -1);

            this.setState({failedSeries});
        }
    }

    private saveEmptySeries(series: ISerie[]) {
        const emptySeries = series.filter(emptySerie);
        this.setState({ emptySeries: emptySeries.map(getId)});
    }

    private saveLastSuccessQuery() {
        this.setState({ lastSuccessQueryParams: getQueryParams(this.props.location) });
    }

    private removeDateParams() {
        const params = getQueryParams(this.props.location);
        if (params.get('start_date') === null && params.get('end_date') === null) { return }

        params.delete('start_date');
        params.delete('end_date');
        this.setQueryParams(params);
        this.props.dispatch(setDate({ start: '', end: '' }));
    }

}

function getIDs(location: Location): string[] {
    const params = new URLSearchParams(location.search);

    let ids = params.getAll('ids');
    ids = ids.length ? ids.join(',').split(',') : [];

    return ids;
}

function getDateFromUrl(location: Location): IDateRange {
    const params = getQueryParams(location);
    const start = params.get('start_date') || '';
    const end = params.get('end_date') || '';

    return { start, end };
}

export function getQueryParams(location: any): URLSearchParams {
    return new URLSearchParams(location.search);
}

export function seriesConfigByUrl(url: string): (series: ISerie[]) => SerieConfig[] {
    if (url === undefined) { return (_: ISerie[]) => [] }

    const search = url.split(',');

    return (series: ISerie[]) => series.map((serie: ISerie) => {
        const seriesConfig = new SerieConfig(serie);
        seriesConfig.setPercentChange(search.some((value: string) => value.includes(serie.id) && value.includes('percent_change')));
        seriesConfig.setPercentChangeAYearAgo(search.some((value: string) => value.includes(serie.id) && value.includes('percent_change_a_year_ago')));
        return seriesConfig;
    });
}

export function colorFor(series: ISerie[], serieId: string): Color {
    const colors = (Object as any).values(Colors);
    const index = series.findIndex(viewSerie => viewSerie.id === serieId) % colors.length;

    return colors[index];
}

function serieIdSanitizer(serieId: string): string {
    return serieId.split(':')[0];
}

function emptySerie(serie: ISerie, position: number): boolean {
    return serie.data.length === 0 || serie.data.every((d: any) => d.datapoint[position+1] === null)
}

function serieWithData(serie: ISerie, position: number): boolean {
    return serie.data.length > 0 && serie.data.some((d: any) => d.datapoint[position+1])
}


function mapStateToProps(state: IStore) {
    return {
        formatChartUnits: state.formatChartUnits,
        seriesApi: state.seriesApi,
    };
}

export default withRouter<any>(connect(mapStateToProps)(ViewPage as any));
