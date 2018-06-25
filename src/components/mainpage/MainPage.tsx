import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SeriesHero from '../style/Hero/SeriesHero';

import { ISerie } from '../../api/Serie';
import { ISerieApi } from '../../api/SerieApi';
import { IStore } from '../../store/initialState';
import SearchBox from '../common/searchbox/SearchBox';
import Featured from './featured/Featured';

interface IMainPageProps {
    featured: ISerie[];
    history?: any;
    seriesApi: ISerieApi;
}

export class MainPage extends React.Component<IMainPageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);

        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.redirectToViewPage = this.redirectToViewPage.bind(this);
    }

    public redirectToSearchPage(searchTerm: string) {
        this.props.history.push('/search/?q=' + searchTerm);
    }

    public redirectToViewPage(serieId: string) {
        this.props.history.push('/view/?ids=' + serieId);
    }

    public render() {
        return (
            <section id="home">
                <SeriesHero searchBox={<SearchBox seriesApi={this.props.seriesApi} onSearch={this.redirectToSearchPage} onSelect={this.redirectToViewPage}/>}/>
                <Featured featured={this.props.featured} />
            </section>
        );
    }
}


function mapStateToProps(state: IStore) {
    return {
        featured: state.featured,
        seriesApi: state.seriesApi,
    }
}

export default connect(mapStateToProps)(withRouter(MainPage));
