import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouterProps, withRouter } from "react-router";

import ClearFix from '../style/ClearFix';
import Container from '../style/Common/Container';
import SeriesHero from '../style/Hero/SeriesHero';
import AddAndCustomizeSeriesButton from './AddAndCustomizeSeriesButton';
import SeriesTags from './SeriesTags'

import { clearViewSeries, loadViewSeries } from '../../actions/seriesActions';
import { ISerie } from '../../api/Serie';
import { ISerieApi } from '../../api/SerieApi';
import SearchBox from '../common/searchbox/SearchBox'
import DetallePanel from './DetallePanel';
import Graphic from './graphic/Graphic';
import MetaData from './metadata/MetaData';
import SeriesPicker, { ISeriesPickerProps } from './seriespicker/SeriesPicker';

interface IViewPageProps extends RouterProps {
    series: ISerie[];
    seriesApi: ISerieApi;
    readonly location: { search: string };
    readonly dispatch: (action: object) => void;
}

export class ViewPage extends React.Component<IViewPageProps, any> {

    private unlisten: (() => void);

    constructor(props: IViewPageProps, context: any) {
        super(props, context);

        this.onSeriesFetchedSuccess = this.onSeriesFetchedSuccess.bind(this);
        this.handleUriChange = this.handleUriChange.bind(this);
        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.redirectToViewPage = this.redirectToViewPage.bind(this);
        this.removeSerie = this.removeSerie.bind(this);
        this.seriesPickerProps = this.seriesPickerProps.bind(this);
        this.isChecked = this.isChecked.bind(this);
        this.addPickedSerie = this.addPickedSerie.bind(this);
    }

    public viewSeries(ids: string[]) {
        const params = this.getQueryParams();

        params.set('ids', ids.join(','))

        this.setQueryParams(params);
    }

    public getQueryParams(): URLSearchParams {

        return new URLSearchParams(this.props.location.search);
    }

    public setQueryParams(params: URLSearchParams) {

        const queryString = params.toString()
            .replace(new RegExp('%2C', 'g'), ',')
            .replace(new RegExp('%3A', 'g'), ':');

        this.props.history.push("/view/?" + queryString);
    }

    public addPickedSerie(event: React.MouseEvent<HTMLAnchorElement>, serieId: string) {

        const ids = getIDs(this.props.location as Location).concat(serieId);
        this.viewSeries(ids);
    }

    public removeSerie(event: React.MouseEvent<HTMLAnchorElement>, serieId: string) {

        const ids = getIDs(this.props.location as Location).filter((val) => val !== serieId);
        if (ids.length) {
            this.viewSeries(ids);
        }
    }

    public redirectToSearchPage(searchTerm: string) {
        this.props.history.push('/search/?q=' + searchTerm);
    }

    public redirectToViewPage(serieId: string) {
        this.props.history.push('/view/?ids=' + serieId);
    }

    public render() {
        if (!this.hasMainSerie()) {
            return <div className='ViewPage'>
                <h1>Cargando...</h1>
                <SearchBox onSearch={this.redirectToSearchPage} seriesApi={this.props.seriesApi} onSelect={this.redirectToViewPage}/>
            </div>
        }

        return (
            <section id="detalle">
                <SeriesHero compact={true} searchBox={<SearchBox seriesApi={this.props.seriesApi} onSearch={this.redirectToSearchPage} onSelect={this.redirectToViewPage}/>} />
                <div id="detalle-content">
                    <Container>
                        <AddAndCustomizeSeriesButton />
                        <ClearFix />
                        <SeriesTags series={this.props.series} onTagClose={this.removeSerie} />
                        <div className="col-sm-6">
                            <ClearFix />
                        </div>
                        <Graphic series={this.props.series} />
                        <MetaData series={this.props.series} onRemove={this.removeSerie} />
                    </Container>
                    <DetallePanel seriesPicker={
                        <SeriesPicker {...this.seriesPickerProps()} />
                    } />
                </div>
            </section>
        );
    }

    public seriesPickerProps(): ISeriesPickerProps{
        return {
            isChecked: this.isChecked,
            onPick: this.addPickedSerie,
            pegColorFor: this.pegColorFor,
            seriesApi: this.props.seriesApi,
        }
    }

    public isChecked(serieId: string): boolean{
        return this.props.series.map(serie => serie.id).indexOf(serieId) >= 0;
    }

    public pegColorFor(serieId: string): string{
        return "red";
    }

    public componentDidMount() {
        this.unlisten = this.props.history.listen(l => this.handleUriChange(l)); // se subscribe
        this.handleUriChange(this.props.location as Location);
    }

    public componentWillUnmount() {
        this.unlisten(); // se dessubscribe
        this.props.dispatch(clearViewSeries());
    }

    public onSeriesFetchedSuccess(series: ISerie[]) {
        this.props.dispatch(loadViewSeries(series));
    }

    private hasMainSerie(): boolean {
        return this.props.series.length > 0;
    }

    private handleUriChange(location: Location) {
        const ids = getIDs(location);

        if (ids.length === 0) {
            return
        }

        const idsWoDuplicates = removeDuplicates(ids);
        if (idsWoDuplicates.length < ids.length) {
            this.viewSeries(idsWoDuplicates);
            return
        }

        this.fetchSeries(ids);
    }

    private fetchSeries(ids: string[]) {
        this.props.seriesApi.fetchSeries(ids).then(this.onSeriesFetchedSuccess).catch(alert);
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
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

function removeDuplicates(arr: any[]) {
    return Array.from(new Set(arr));
}

export default withRouter(connect(mapStateToProps)(ViewPage as any));
