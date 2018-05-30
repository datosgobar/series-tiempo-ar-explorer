import {Location} from 'history';
import * as React from 'react';
import {connect} from 'react-redux';
import {RouterProps, withRouter} from "react-router";

import './ViewPage.css';

import { loadViewSeries } from '../../actions/seriesActions';
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
        this.fetchSeries = this.fetchSeries.bind(this);
        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.addPickedSerie = this.addPickedSerie.bind(this);
    }

    public addPickedSerie(serieId: string){

        const search: string = this.props.location.search; // could be '?foo=bar'
        const params: URLSearchParams = new URLSearchParams(search);
        params.append('ids', serieId)

        this.props.history.push("/view/?" + params)
    }

    public redirectToSearchPage(searchTerm: string){
        this.props.history.push('/search/?q=' + searchTerm);
    }

    public render() {
        if (!this.hasMainSerie()) {
            return <div className='ViewPage'>
                <h1>Cargando...</h1>
                <SearchBox onSearch={this.redirectToSearchPage}/>
            </div>
        }

        return (
            <div className='ViewPage'>
                <h1>ViewPage</h1>
                <SearchBox onSearch={this.redirectToSearchPage}/>
                <Graphic series={this.props.series}/>
                <SeriesPicker seriesApi={this.props.seriesApi} onPick={this.addPickedSerie}/>
                <MetaData series={this.props.series}/>
            </div>
        );
    }


    public componentDidMount() {
        this.unlisten = this.props.history.listen(l => this.fetchSeries(l)); // se subscribe
        this.fetchSeries(this.props.location as Location);
    }

    public componentWillUnmount() {
        this.unlisten(); // se dessubscribe
    }

    public onSeriesFetchedSuccess(series: ISerie[]) {
        this.props.dispatch(loadViewSeries(series));
    }

    private hasMainSerie(): boolean {
        return this.props.series.length > 0;
    }

    private fetchSeries(location: Location) {
        const ids = this.getIDs(location);

        if(ids.length === 0){
            return
        }

        this.props.seriesApi.getSeries(ids).then(this.onSeriesFetchedSuccess).catch(alert);
    }

    private getIDs(location: Location): string[] {
        const search = location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);

        return params.getAll('ids');
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        series: state.viewSeries,
        seriesApi: state.seriesApi,
    };
}

export default withRouter(connect(mapStateToProps)(ViewPage));
