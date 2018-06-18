import * as React from 'react';

import Filters from '../../style/Filters/Filters';
import FilterTitle from '../../style/Filters/FilterTitle';

import { ISerieApi } from '../../../api/SerieApi';
import FilterSources from './filtersources/FilterSources';
import FilterThemes from './filterthemes/FilterThemes';

interface IFilterProps {

    seriesApi: ISerieApi;
    onSourcePicked: (event: React.MouseEvent<HTMLElement>, source: string) => void;
    onThemePicked: (event: React.MouseEvent<HTMLElement>, theme: string) => void;
}

function SeriesFilters(props: IFilterProps) {

    return (

        <Filters>
            <FilterTitle>Filtros:</FilterTitle>
            <FilterSources seriesApi={props.seriesApi} onSourcePicked={props.onSourcePicked} />
            <FilterThemes seriesApi={props.seriesApi} onThemePicked={props.onThemePicked} />
        </Filters>
    );
};

export default SeriesFilters