import * as React from 'react';

import './SearchPage.css';

import SearchBox from '../common/searchbox/SearchBox'
import Serie from '../common/serie/Serie'

interface ISearchPageState {

    results: Serie[]
}

class SearchPage extends React.Component<any, ISearchPageState> {

    public render () {
        return (
            <div className='SearchPage'>
                <h1>Resultados Busqueda</h1>
                
                <SearchBox />
               
            </div>
        );
    }
}

export default SearchPage;