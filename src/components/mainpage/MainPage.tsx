import * as React from 'react';

import './MainPage.css';

import Featured from './featured/Featured'

import SearchBox from '../common/searchbox/SearchBox'
import Serie from '../common/serie/Serie'

interface IMainPageState {

    featured: Serie[]
}

class MainPage extends React.Component<any, IMainPageState> {

    constructor(props: any){
        super(props);

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

export default MainPage;