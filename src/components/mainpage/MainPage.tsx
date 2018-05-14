import * as React from 'react';
import {connect} from 'react-redux';

import './MainPage.css';

import SearchBox from '../common/searchbox/SearchBox'
import Serie from '../common/serie/Serie'
import Featured from './featured/Featured'

interface IMainPageState {

    featured: Serie[]
}

class MainPage extends React.Component<any, IMainPageState> {

    constructor(props: any, context: any){
        super(props, context);

        this.state = {featured: Object.assign({}, this.props.featured )};
    }

    public render () {
        return (
            <div className='MainPage'>
                <h1>Series de tiempo</h1>
                <p>Desde aquí poedés buscar las series de tiempo del tema que necesites,
                     podés seleccionar más de una opcion de los resultados para compararlos.</p>
                <SearchBox />

                <Featured />
                
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any): IMainPageState{
    return {
        featured: state.featured
    };
}

export default connect(mapStateToProps)(MainPage);