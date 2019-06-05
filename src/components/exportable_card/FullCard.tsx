import * as React from 'react';
import { ISerie } from '../../api/Serie';
import { fullLocaleDate } from '../../helpers/dateFunctions';
import { buildLocale } from '../common/locale/buildLocale';
import LocaleDefault from '../common/locale/LocaleDefault';
import FullCardHeader from '../style/exportable_card/FullCardHeader';
import FullCardValue from '../style/exportable_card/FullCardValue';
import FullCardLinks from './FullCardLinks';


interface IFullCardProps {
    serie: ISerie;
    locale: string;
    color: string;
    links: string;
}

export default (props: IFullCardProps) => {
    const locale = buildLocale(props.locale);

    return (
        <div className="full-card">
            <FullCardHeader color={props.color} title={props.serie.description} date={fullLocaleDate('Diaria', props.serie.data[0].date)} />
            <FullCardValue color={props.color} text={formattedValue(props.serie, locale)} />
            <span className="units">{props.serie.units}</span>
            <span className="source">Fuente: {props.serie.datasetSource}</span>
            <FullCardLinks serie={props.serie} links={props.links} />
        </div>
    )
}


function formattedValue(serie: ISerie, locale: LocaleDefault): string {
    const value: number = serie.data[0].value;

    if (serie.isPercentage) {
        return `${(value * 100).toFixed(2)}%`
    } else {
        return locale.toDecimalString(value, 2);
    }
}
