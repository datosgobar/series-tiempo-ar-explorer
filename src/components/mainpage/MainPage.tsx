import * as React from 'react';
import { connect } from 'react-redux';

import './MainPage.css';

import { ISerie } from '../../api/Serie';
import SearchBox from '../common/searchbox/SearchBox'
import Featured from './featured/Featured'

interface IMainPageProps {
    featured: ISerie[]
}

export class MainPage extends React.Component<IMainPageProps, any> {
    public render() {
        return (
            <div className='MainPage'>
                <h1>Series de tiempo</h1>
                <p>Desde aquí podés buscar las series de tiempo del tema que necesites,
                 podés seleccionar más de una opcion de los resultados para compararlos.</p>
                <SearchBox />

                <Featured featured={this.props.featured} />

            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        featured: state.featured
    }
}

export default connect(mapStateToProps)(MainPage);
