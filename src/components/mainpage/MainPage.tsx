import * as React from 'react';

import './MainPage.css';

import SearchBox from '../common/searchbox/SearchBox'
import Featured from './featured/Featured'

export default (() => {
    return (
        <div className='MainPage'>
            <h1>Series de tiempo</h1>
            <p>Desde aquí podés buscar las series de tiempo del tema que necesites,
                 podés seleccionar más de una opcion de los resultados para compararlos.</p>
            <SearchBox />

            <Featured />

        </div>
    );
}
);
