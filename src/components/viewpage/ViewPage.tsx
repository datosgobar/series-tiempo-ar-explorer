import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouterProps, withRouter } from "react-router";

import ClearFix from '../style/ClearFix';
import Container from '../style/Common/Container';
import SeriesHero from '../style/Hero/SeriesHero';
import AddAndCustomizeSeries from './AddAndCustomizeSeries';
import DownloadDropdown from './DownloadDropdown';
import SeriesTags from './SeriesTags'

import { clearViewSeries, loadViewSeries } from '../../actions/seriesActions';
import { ISerie } from '../../api/Serie';
import { ISerieApi } from '../../api/SerieApi';
import SearchBox from '../common/searchbox/SearchBox'
import Graphic from './graphic/Graphic';
import MetaData from './metadata/MetaData';
import SeriesPicker from './seriespicker/SeriesPicker';

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
        this.addPickedSerie = this.addPickedSerie.bind(this);
        this.removeSerie = this.removeSerie.bind(this);
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

    public render() {
        if (!this.hasMainSerie()) {
            return <div className='ViewPage'>
                <h1>Cargando...</h1>
                <SearchBox onSearch={this.redirectToSearchPage} seriesApi={this.props.seriesApi}/>
            </div>
        }

        return (
            <section id="detalle">
                <SeriesHero compact={true} searchBox={<SearchBox onSearch={this.redirectToSearchPage} />} />
                <div id="detalle-content">
                    <Container>
                        <AddAndCustomizeSeries />
                        <ClearFix />
                        <SeriesTags series={this.props.series} onTagClose={this.removeSerie}/>
                        <div className="col-sm-6">
                            <DownloadDropdown />
                            <ClearFix />
                        </div>
                        <Graphic series={this.props.series} />
                        <SeriesPicker seriesApi={this.props.seriesApi} onPick={this.addPickedSerie} />
                        <MetaData series={this.props.series} onRemove={this.removeSerie} />
                    </Container>
                </div>
            </section>
        );
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
        this.props.seriesApi.getSeries(ids).then(this.onSeriesFetchedSuccess).catch(alert);
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

export default withRouter(connect(mapStateToProps)(ViewPage));
