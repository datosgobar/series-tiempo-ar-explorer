import * as React from 'react';

import { ISerieApi } from '../../../api/SerieApi';
import FilterSources from './filtersources/FilterSources';

interface IFilterProps {

    seriesApi: ISerieApi;
    onSourcePicked: (event: React.MouseEvent<HTMLElement>, source:string) => void;
}

function Filters(props: IFilterProps) {

    return (
        <FilterSources seriesApi={props.seriesApi} onSourcePicked={props.onSourcePicked}/>
    );
};

export default Filters