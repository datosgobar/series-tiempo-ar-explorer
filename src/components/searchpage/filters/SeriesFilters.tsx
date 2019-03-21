import * as React from 'react';
import { ISerieApi } from '../../../api/SerieApi';
import FilterSources from '../../common/filters/filtersources/FilterSources';
import FilterThemes from '../../common/filters/filterthemes/FilterThemes';
import { ISelectorProps } from '../../common/selector/Selector';
import Filters from '../../style/Filters/Filters';
import FilterSubTitle from '../../style/Filters/FilterSubTitle';
import FilterTitle from '../../style/Filters/FilterTitle';


interface IFilterProps {
    seriesApi: ISerieApi;
    onSourcePicked: (source: string) => void;
    onThemePicked: (theme: string) => void;
    selector: React.ComponentClass<ISelectorProps<string>>;
}

export default (props: IFilterProps) =>
    <Filters>
        <FilterTitle>Filtros:</FilterTitle>
        <FilterSubTitle>Fuentes:</FilterSubTitle>
        <FilterSources  selector={props.selector} seriesApi={props.seriesApi} onSourcePicked={props.onSourcePicked} />
        <FilterSubTitle>Temas:</FilterSubTitle>
        <FilterThemes  selector={props.selector} seriesApi={props.seriesApi} onThemePicked={props.onThemePicked} />
    </Filters>
