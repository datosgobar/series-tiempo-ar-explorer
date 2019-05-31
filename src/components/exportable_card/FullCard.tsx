import * as React from 'react';
import { ISerie } from '../../api/Serie';
import { fullLocaleDate } from '../../helpers/dateFunctions';
import { buildLocale } from '../common/locale/buildLocale';
import ExportableCardPercentage from '../style/exportable_card/ExportableCardPercentage';
import ExportableCardValue from '../style/exportable_card/ExportableCardValue';


interface IFullCardProps {
    serie: ISerie;
    seriePercentChange: ISerie;
    locale: string;
    color: string;
}

export default (props: IFullCardProps) => {
    const locale = buildLocale(props.locale);

    return (
        <div>
            <strong>{props.serie.description}</strong>
            <h5>{fullLocaleDate('Diaria', props.serie.data[0].date)}</h5>
            <ExportableCardValue color={props.color} text={locale.toDecimalString(props.serie.data[0].value)} />
            <h5>{props.serie.units}</h5>
            <ExportableCardPercentage color={props.color} text={`${locale.toDecimalString(props.seriePercentChange.data[0].value)}% interanual`} />
            <h5>Fuente: {props.serie.datasetSource}</h5>
        </div>
    )
}
