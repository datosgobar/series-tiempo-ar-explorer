import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ISerieApi } from '../../api/SerieApi';
import { getMaxDecimalsAmount } from '../../helpers/common/decimalsAmountHandling';
import { IStore } from '../../store/initialState';
import SearchBox from '../common/searchbox/SearchBox';
import SeriesHero from '../style/Hero/SeriesHero';
import Featured from './featured/Featured';

interface IMainPageProps {
    history?: any;
    seriesApi: ISerieApi;
    dispatch?: any;
    featured: string[];
    maxDecimals?: number;
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
        this.props.history.push('/series/?ids=' + serieId);
    }

    public render() {

        const maxDecimals = getMaxDecimalsAmount(this.props.maxDecimals);
        return (
            <section id="home">
                <SeriesHero searchBox={<SearchBox seriesApi={this.props.seriesApi} 
                            onSearch={this.redirectToSearchPage} 
                            onSelect={this.redirectToViewPage}/>}/>
                <Featured featured={this.props.featured}
                          seriesApi={this.props.seriesApi}
                          maxDecimals={maxDecimals} />
            </section>
        );

    }
}


function mapStateToProps(state: IStore) {
    return {
        featured: state.featured,
        maxDecimals: state.maxDecimals,
        seriesApi: state.seriesApi,
    }
}

export default connect(mapStateToProps)(withRouter(MainPage));
