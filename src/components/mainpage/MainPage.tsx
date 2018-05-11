import * as React from 'react';
import {connect} from 'react-redux';

import './MainPage.css';

import Featured from './featured/Featured'

import SearchBox from '../common/searchbox/SearchBox'
import Serie from '../common/serie/Serie'

interface IMainPageState {

    featured: Serie[]
}

class MainPage extends React.Component<any, IMainPageState> {

    constructor(props: any, context: any){
        super(props, context);

        this.state = {featured: this.props.featured};
    }

    public render () {
        return (
            <div className='MainPage'>
                <h1>MainPage</h1>
                <SearchBox />

                <Featured featured={this.state.featured}/>
                
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