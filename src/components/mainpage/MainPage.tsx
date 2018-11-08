import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import SeriesHero from '../style/Hero/SeriesHero';

import QueryParams from "../../api/QueryParams";
import {ISerieApi} from '../../api/SerieApi';
import {IStore} from '../../store/initialState';
import SearchBox from '../common/searchbox/SearchBox';
import Featured from './featured/Featured';

interface IMainPageProps {
    history?: any;
    seriesApi: ISerieApi;
    dispatch?: any;
    featured: string[];
}

export class MainPage extends React.Component<IMainPageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);

        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.redirectToViewPage = this.redirectToViewPage.bind(this);

        this.state = {
            featuredLoaded: false,
            featuredSeries: []
        }
    }

    public componentWillMount() {
        this.fetchFeaturedSeries();
    }

    public redirectToSearchPage(searchTerm: string) {
        this.props.history.push('/search/?q=' + searchTerm);
    }

    public redirectToViewPage(serieId: string) {
        this.props.history.push('/series/?ids=' + serieId);
    }

    public render() {
        return (
            <section id="home">
                <SeriesHero searchBox={<SearchBox seriesApi={this.props.seriesApi} onSearch={this.redirectToSearchPage} onSelect={this.redirectToViewPage}/>}/>
                <Featured featured={this.state.featuredSeries} featuredLoaded={this.state.featuredLoaded}/>
            </section>
        );
    }

    private fetchFeaturedSeries() {
        const params = new QueryParams(this.props.featured);
        this.props.seriesApi.fetchSeries(params).then(featuredSeries => {
            this.setState({featuredLoaded: true, featuredSeries});
        })
    }

}


function mapStateToProps(state: IStore) {
    return {
        featured: state.featured,
        seriesApi: state.seriesApi,
    }
}

export default connect(mapStateToProps)(withRouter(MainPage));
