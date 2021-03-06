import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ISerieApi } from '../../api/SerieApi';
import { getMaxDecimalsAmount } from '../../helpers/common/decimalsAmountHandling';
import { IStore } from '../../store/initialState';
import SearchBox from '../common/searchbox/SearchBox';
import SeriesHero from '../style/Hero/SeriesHero';
import Featured from './featured/Featured';
import { buildAbbreviationProps } from '../../helpers/common/numberAbbreviation';

interface IMainPageProps {
    history?: any;
    seriesApi: ISerieApi;
    dispatch?: any;
    featured: string[];
    maxDecimals?: number;
    heroImageUrl: string;
    numbersAbbreviate?: boolean;
    decimalsBillion?: number;
    decimalsMillion?: number;
    locale: string;
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
        const abbreviationProps = buildAbbreviationProps(this.props.numbersAbbreviate, this.props.decimalsBillion, this.props.decimalsMillion);
        return (
            <section id="home">
                <SeriesHero searchBox={<SearchBox seriesApi={this.props.seriesApi} 
                                                  onSearch={this.redirectToSearchPage} 
                                                  onSelect={this.redirectToViewPage}/>}
                            heroImageUrl={this.props.heroImageUrl} />
                <Featured featured={this.props.featured}
                          seriesApi={this.props.seriesApi}
                          maxDecimals={maxDecimals} 
                          numbersAbbreviate={abbreviationProps.numbersAbbreviate} 
                          decimalsBillion={abbreviationProps.decimalsBillion} 
                          decimalsMillion={abbreviationProps.decimalsMillion}
                          locale={this.props.locale} />
            </section>
        );

    }
}


function mapStateToProps(state: IStore) {
    return {
        decimalsBillion: state.decimalsBillion,
        decimalsMillion: state.decimalsMillion,
        featured: state.featured,
        heroImageUrl: state.heroImageUrl,
        locale: state.locale,
        maxDecimals: state.maxDecimals,
        numbersAbbreviate: state.numbersAbbreviate,
        seriesApi: state.seriesApi
    }
}

export default connect(mapStateToProps)(withRouter(MainPage));
