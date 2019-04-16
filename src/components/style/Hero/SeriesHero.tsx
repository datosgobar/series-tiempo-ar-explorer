import * as React from 'react';
import BigSeriesHero1 from './BigSeriesHero';
import CompactSeriesHero from './CompactSeriesHero';


const TITLE = "Series de tiempo"
const PARAGRAPH = "Desde aquí podés buscar las series de tiempo del tema que necesites, podés seleccionar más de una opcion de los resultados para compararlos."

export interface ISeriesHeroProps extends React.Props<any> {
    compact?: boolean;
    searchBox: JSX.Element;
}


export default (props: ISeriesHeroProps) => {
    const SeriesHero = props.compact ? CompactSeriesHero : BigSeriesHero1;

    return <SeriesHero title={TITLE} paragraph={PARAGRAPH} searchBox={props.searchBox} />
}
