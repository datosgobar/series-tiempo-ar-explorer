import * as React from 'react';
import { IDataPoint } from '../../api/DataPoint';
import { ISerie } from '../../api/Serie';
import { fullLocaleDate } from '../../helpers/dateFunctions';
import { ICardBaseConfig } from '../../indexCard';
import { buildLocale } from '../common/locale/buildLocale';
import FullCardContainer from '../style/exportable_card/FullCardContainer';
import FullCardHeader from '../style/exportable_card/FullCardHeader';
import FullCardValue from '../style/exportable_card/FullCardValue';
import FullCardChart from './FullCardChart';
import FullCardLinks from './FullCardLinks';


interface IFullCardProps {
    serie: ISerie;
    downloadUrl: string;
    cardOptions: ICardBaseConfig
    laps: number;
}

export default (props: IFullCardProps) => {
    const options = {
        ...props.cardOptions,
        downloadUrl: props.downloadUrl,
        serieId: props.serie.id
    }

    return (
        <FullCardContainer cardOptions={props.cardOptions}>
            <FullCardHeader color={props.cardOptions.color} title={props.serie.description} date={lastSerieDate(props.serie)} />
            <FullCardValue color={props.cardOptions.color} text={formattedValue(props.serie, props.cardOptions.locale)} />
            <FullCardChart data={shortDataList(props.serie.data, props.laps)} chartType={props.cardOptions.hasChart} />
            <p className="c-main-title">{props.serie.units}</p>
            <p className="c-span bt">Fuente: {props.serie.datasetSource}</p>
            <FullCardLinks options={options} />
        </FullCardContainer>
    )
}

function shortDataList(data: IDataPoint[], laps: number): IDataPoint[] {
    const result = data.slice(Math.max(data.length - laps, 0));

    return notNullData(result);
}

function notNullData(data: IDataPoint[]): IDataPoint[] {
    return data.filter((d: IDataPoint) => d.value !== null);
}

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
