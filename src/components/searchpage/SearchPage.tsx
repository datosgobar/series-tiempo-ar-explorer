import * as React from 'react';

import './SearchPage.css';

import SearchBox from '../common/searchbox/SearchBox'


class SearchPage extends React.Component<any, any> {

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