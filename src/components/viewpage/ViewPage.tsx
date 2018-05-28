import * as React from 'react';
import { connect } from 'react-redux';

import './ViewPage.css';

import { loadViewSeries } from '../../actions/seriesActions';
import { ISerie } from '../../api/Serie';
import { ISerieApi } from '../../api/SerieApi';
import SerieApi from '../../SerieApi';

import SearchBox from '../common/searchbox/SearchBox'
import Graphic from './graphic/Graphic';
import MetaData from './metadata/MetaData';

interface IViewPageProps {
    series: ISerie[];
    readonly location: {search: string};
    readonly dispatch: (action: object) => void;
    seriesApi?: ISerieApi;
}

export class ViewPage extends React.Component<IViewPageProps, any> {

    private seriesApi: ISerieApi;

    constructor(props: IViewPageProps, context: any) {
        super(props, context);

        this.seriesApi = this.props.seriesApi || SerieApi;

        this.onSeriesFetchedSuccess = this.onSeriesFetchedSuccess.bind(this);

    }

    public componentDidMount() {
        this.fetchSeries(this.props);
    }

    public componentDidUpdate(prevProps: IViewPageProps, prevState: any, snapshot: any) {
        if (prevProps.location.search !== this.props.location.search) {
            this.fetchSeries(this.props);
        }
    }

    public render() {
        if (!this.hasMainSerie()) {
            return  <div className='ViewPage'>
                <h1>Cargando...</h1>
                <SearchBox />
            </div>
        }

        return (
            <div className='ViewPage'>
                <h1>ViewPage</h1>
                <SearchBox />
                <Graphic series={this.props.series} />
                <MetaData series={this.props.series} />
            </div>
        );
    }

    public onSeriesFetchedSuccess(series: ISerie[]) {
        this.props.dispatch(loadViewSeries(series));
    }

    private hasMainSerie(): boolean {
        return this.props.series.length > 0;
    }

    private fetchSeries(props: IViewPageProps) {
        const ids = this.getIDs(props);
        this.seriesApi.getSeries(ids).then(this.onSeriesFetchedSuccess).catch(alert);
    }

    private getIDs(props: IViewPageProps): string[] {
        const search = props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        return params.getAll('ids');
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        series: state.viewSeries
    };
}

export default connect(mapStateToProps)(ViewPage);
