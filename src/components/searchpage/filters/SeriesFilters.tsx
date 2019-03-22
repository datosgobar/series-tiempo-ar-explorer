import * as React from 'react';
import { ISerieApi } from '../../../api/SerieApi';
import Filters from '../../style/Filters/Filters';
import FilterSubTitle from '../../style/Filters/FilterSubTitle';
import FilterTitle from '../../style/Filters/FilterTitle';
import FilterSources from './FilterSources';
import FilterThemes from './FilterThemes';


interface IFilterProps {
    seriesApi: ISerieApi;
    onSourcePicked: (source: string) => void;
    onThemePicked: (theme: string) => void;
}

export default (props: IFilterProps) =>
    <Filters>
        <FilterTitle>Filtros:</FilterTitle>
        <FilterSubTitle>Fuentes:</FilterSubTitle>
        <FilterSources seriesApi={props.seriesApi} onSourcePicked={props.onSourcePicked} />
        <FilterSubTitle>Temas:</FilterSubTitle>
        <FilterThemes seriesApi={props.seriesApi} onThemePicked={props.onThemePicked} />
    </Filters>
