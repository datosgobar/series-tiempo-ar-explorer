import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Hero from '../style/Hero';
import PLarger from '../style/PLarger';
import Row from '../style/Row';
import TitleXXL from '../style/TitleXXL';

import { ISerie } from '../../api/Serie';
import SearchBox from '../common/searchbox/SearchBox'
import Featured from './featured/Featured'

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
                <Hero>
                    <Row>
                        <TitleXXL>Series de tiempo</TitleXXL>
                        <PLarger>Desde aquí podés buscar las series de tiempo del tema que necesites,
                 podés seleccionar más de una opcion de los resultados para compararlos.</PLarger>
                    </Row>
                    <Row>
                        <SearchBox onSearch={this.redirectToSearchPage} />
                    </Row>
                </Hero>

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
