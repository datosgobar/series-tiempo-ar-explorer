import * as React from 'react';
import { ISerie } from '../../api/Serie';
import { fullLocaleDate } from '../../helpers/dateFunctions';
import { buildLocale } from '../common/locale/buildLocale';
import FullCardHeader from '../style/exportable_card/FullCardHeader';
import FullCardValue from '../style/exportable_card/FullCardValue';
import FullCardChart from './FullCardChart';
import FullCardLinks from './FullCardLinks';


interface IFullCardProps {
    serie: ISerie;
    locale: string;
    color: string;
    hasChart: string;
    laps: number;
}

export default (props: IFullCardProps) =>
    <div className="full-card" >
        <FullCardHeader color={props.color} title={props.serie.description} date={lastSerieDate(props.serie)} />
        <FullCardValue color={props.color} text={formattedValue(props.serie, props.locale)} />
        <FullCardChart data={props.serie.data} chartType={props.hasChart} />
        <span className="units">{props.serie.units}</span>
        <span className="source">Fuente: {props.serie.datasetSource}</span>
        <FullCardLinks serie={props.serie} />
    </div>


function lastSerieDate(serie: ISerie): string {
    return fullLocaleDate(serie.accrualPeriodicity, serie.data[serie.data.length-1].date);
}

function formattedValue(serie: ISerie, localeType: string): string {
    const value: number = serie.data[serie.data.length-1].value;
    const locale = buildLocale(localeType);

    if (serie.isPercentage) {
        return `${(value * 100).toFixed(2)}%`
    } else {
        return locale.toDecimalString(value, 2);
    }
}
