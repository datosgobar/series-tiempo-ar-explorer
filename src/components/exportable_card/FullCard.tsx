import * as React from 'react';
import { ISerie } from '../../api/Serie';
import { fullLocaleDate } from '../../helpers/dateFunctions';
import { buildLocale } from '../common/locale/buildLocale';
import LocaleDefault from '../common/locale/LocaleDefault';
import ExportableCardValue from '../style/exportable_card/ExportableCardValue';


interface IFullCardProps {
    serie: ISerie;
    locale: string;
    color: string;
}

export default (props: IFullCardProps) => {
    const locale = buildLocale(props.locale);

    return (
        <div>
            <strong>{props.serie.description}</strong>
            <h5>{fullLocaleDate('Diaria', props.serie.data[0].date)}</h5>
            <ExportableCardValue color={props.color} text={formattedValue(props.serie, locale)} />
            <h5>{props.serie.units}</h5>
            <h5>Fuente: {props.serie.datasetSource}</h5>
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
