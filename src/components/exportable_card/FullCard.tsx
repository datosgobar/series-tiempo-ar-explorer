import * as React from 'react';
import { IDataPoint } from '../../api/DataPoint';
import { ISerie, DEFAULT_SIGNIFICANT_FIGURES } from '../../api/Serie';
import { CardValueFormatter, ICardValueFormatterConf } from '../../helpers/card/cardValueFormatter';
import { fullLocaleDate } from '../../helpers/common/dateFunctions';
import { ICardBaseConfig } from '../../indexCard';
import FullCardContainer from '../style/exportable_card/FullCardContainer';
import FullCardHeader from '../style/exportable_card/FullCardHeader';
import FullCardSource from '../style/exportable_card/FullCardSource';
import FullCardUnits from '../style/exportable_card/FullCardUnits';
import FullCardValue from '../style/exportable_card/FullCardValue';
import FullCardChart from './FullCardChart';
import FullCardLinks from './FullCardLinks';
import { getFullSerieId } from "../../helpers/common/fullSerieID";


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
        serieId: getFullSerieId(props.serie)
    }
    const value = props.serie.data[props.serie.data.length-1].value
    const formatterProps: ICardValueFormatterConf = {
        decimals: options.decimals || DEFAULT_SIGNIFICANT_FIGURES,
        explicitSign: options.explicitSign,
        isPercentage: props.serie.isPercentage,
        locale: options.locale
    }
    const formatter = new CardValueFormatter(formatterProps)
        
    return (
        <FullCardContainer color={options.color}
                           hasChart={options.hasChart}
                           hasFrame={options.hasFrame}
                           hasColorBar={options.hasColorBar}
                           links={options.links}
                           serieId={options.serieId}>
            <FullCardHeader color={options.color}
                            override={options.title}
                            defaultTitle={props.serie.description}
                            date={lastSerieDate(props.serie)} />
            <FullCardValue color={options.color} text={formatter.formattedValue(value || 0)} />
            <FullCardChart data={shortDataList(props.serie.data, props.laps)} chartType={options.hasChart} />
            <FullCardUnits units={props.serie.representationModeUnits} override={options.units}/>
            <FullCardSource source={props.serie.datasetSource} override={options.source}/>
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
