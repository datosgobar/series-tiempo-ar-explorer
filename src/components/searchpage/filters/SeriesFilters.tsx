import * as React from 'react';
import { connect } from "react-redux";
import { IAggregationValue } from '../../../api/ITSAPIResponse';
import { IStore } from "../../../store/initialState";
import SearchFilter from '../../common/selector/SearchFilter';
import Filters from '../../style/Filters/Filters';
import FilterSubTitle from '../../style/Filters/FilterSubTitle';
import FilterTitle from '../../style/Filters/FilterTitle';


interface IFilterProps {
    onSourcePicked: (source: string) => void;
    onThemePicked: (theme: string) => void;
    onPublisherPicked: (publisher: string) => void;
    onUnitsPicked: (units: string) => void;
    onCatalogPicked: (catalog: string) => void;
    picked: string;
    sources: IAggregationValue[];
    themes: IAggregationValue[];
    publishers: IAggregationValue[];
    units: IAggregationValue[];
    catalogId: IAggregationValue[];
}

const SeriesFilters = (props: IFilterProps) =>
    <Filters>
        <FilterTitle>Filtros:</FilterTitle>
        <FilterSubTitle>Temas:</FilterSubTitle>
        <SearchFilter onChange={props.onThemePicked} items={props.themes} selected={props.picked} />
        <FilterSubTitle>Fuentes:</FilterSubTitle>
        <SearchFilter onChange={props.onSourcePicked} items={props.sources} selected={props.picked} />
        <FilterSubTitle>Publicadores:</FilterSubTitle>
        <SearchFilter onChange={props.onPublisherPicked} items={props.publishers} selected={props.picked} />
        <FilterSubTitle>Uidades:</FilterSubTitle>
        <SearchFilter onChange={props.onUnitsPicked} items={props.units} selected={props.picked} />
        <FilterSubTitle>Catálogos:</FilterSubTitle>
        <SearchFilter onChange={props.onCatalogPicked} items={props.catalogId} selected={props.picked} />
    </Filters>


function mapStateToProps(state: IStore) {
    return {
        catalogId: state.aggregations.catalog_id,
        picked: state.searchParams.datasetTheme,
        publishers: state.aggregations.dataset_publisher_name,
        sources: state.aggregations.dataset_source,
        themes: state.aggregations.dataset_theme,
        units: state.aggregations.units,
    };
}

export default connect(mapStateToProps)(SeriesFilters);
