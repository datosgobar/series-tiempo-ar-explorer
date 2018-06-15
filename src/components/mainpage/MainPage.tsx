import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SeriesHero from '../style/Hero/SeriesHero';

import { ISerie } from '../../api/Serie';
import SearchBox from '../common/searchbox/SearchBox';
import Featured from './featured/Featured';

interface IMainPageProps {
    featured: ISerie[];
    history?: any;
}

export class MainPage extends React.Component<IMainPageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);

        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
    }

    public redirectToSearchPage(searchTerm: string) {
        this.props.history.push('/search/?q=' + searchTerm);
    }

    public render() {
        return (
            <section id="home">
                <SeriesHero searchBox={<SearchBox onSearch={this.redirectToSearchPage} />}/>
                <Featured featured={this.props.featured} />
            </section>
        );
    }
}


function mapStateToProps(state: any) {
    return {
        featured: state.featured
    }
}

export default connect(mapStateToProps)(withRouter(MainPage));
