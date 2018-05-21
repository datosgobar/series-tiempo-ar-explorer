import * as React from 'react';
import { connect } from 'react-redux';

import './ViewPage.css';

import { ISerie } from '../../api/Serie';
import SearchBox from '../common/searchbox/SearchBox'

import SerieApi from '../../SerieApi';

import { loadViewSeries } from '../../actions/seriesActions';

interface IViewPageProps {
    series: ISerie[];
    location: any;
    dispatch: any;
}

export class ViewPage extends React.Component<IViewPageProps, any> {

    constructor(props: any) {
        super(props);

        this.onSeriesFetchedSuccess = this.onSeriesFetchedSuccess.bind(this);

        this.fetchSeries();
    }

    public render() {
        return (
            <div className='ViewPage'>
                <h1>ViewPage</h1>
                <SearchBox />


            </div>
        );
    }

    public onSeriesFetchedSuccess(series: ISerie[]) {
        this.props.dispatch(loadViewSeries(series));
    }

    private fetchSeries() {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const ids = params.getAll('id')

        SerieApi.getSeries(ids).then(this.onSeriesFetchedSuccess).catch(alert);
    }
}

export default connect()(ViewPage);