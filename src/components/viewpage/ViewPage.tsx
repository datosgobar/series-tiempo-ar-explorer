import * as React from 'react';
import { connect } from 'react-redux';

import './ViewPage.css';

import { loadViewSeries } from '../../actions/seriesActions';
import { ISerie } from '../../api/Serie';

import { ISerieApi } from '../../api/SerieApi';
import SearchBox from '../common/searchbox/SearchBox'
import Graphic from './graphic/Graphic';
import MetaData from './metadata/MetaData';

interface IViewPageProps {
    series: ISerie[];
    seriesApi: ISerieApi;
    readonly location: {search: string};
    readonly dispatch: (action: object) => void;
}

export class ViewPage extends React.Component<IViewPageProps, any> {

    constructor(props: IViewPageProps, context: any) {
        super(props, context);

        this.onSeriesFetchedSuccess = this.onSeriesFetchedSuccess.bind(this);

        this.fetchSeries();
    }

    public render() {
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

    private fetchSeries() {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const ids = params.getAll('id');

        this.props.seriesApi.getSeries(ids).then(this.onSeriesFetchedSuccess).catch(alert);
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        series: state.viewSeries,
        seriesApi: state.seriesApi,
    };
}

export default connect(mapStateToProps)(ViewPage);
