import * as React from 'react';
import { connect } from 'react-redux';

import './ViewPage.css';

import { loadViewSeries } from '../../actions/seriesActions';
import { ISerie } from '../../api/Serie';
// import MetaData from './metadata/MetaData';

import SerieApi from '../../SerieApi';
import SearchBox from '../common/searchbox/SearchBox'
import MetaData from './metadata/MetaData';

interface IViewPageProps {
    series: ISerie[];
    location: any;
    dispatch: any;
}

export class ViewPage extends React.Component<IViewPageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);

        this.onSeriesFetchedSuccess = this.onSeriesFetchedSuccess.bind(this);

        this.fetchSeries();
    }

    public render() {
        return (
            <div className='ViewPage'>
                <h1>ViewPage</h1>
                <SearchBox />
                <MetaData series={this.props.series}/>

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

function mapStateToProps(state: any, ownProps: any) {
    return {
        series: state.viewSeries
    };
}

export default connect(mapStateToProps)(ViewPage);