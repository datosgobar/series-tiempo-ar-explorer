import * as React from 'react';
import { ISerie } from '../../api/Serie';
import { fullLocaleDate } from '../../helpers/dateFunctions';
import { buildLocale } from '../common/locale/buildLocale';


interface IFullCardProps {
    serie: ISerie;
    seriePercentChange: ISerie;
    locale: string;
}

export default (props: IFullCardProps) => {
    const locale = buildLocale(props.locale);

    return (
        <div>
            <strong>{props.serie.description}</strong>
            <h5>{fullLocaleDate('Diaria', props.serie.data[0].date)}</h5>
            <h1>{locale.toDecimalString(props.serie.data[0].value)}</h1>
            <h5>{props.serie.units}</h5>
            <h3>{locale.toDecimalString(props.seriePercentChange.data[0].value)}% interanual</h3>
            <h5>Fuente: {props.serie.datasetSource}</h5>
        </div>
    )
}
