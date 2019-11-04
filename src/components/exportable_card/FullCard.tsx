import * as React from 'react';
import { IDataPoint } from '../../api/DataPoint';
import { DEFAULT_SIGNIFICANT_FIGURES, ISerie } from '../../api/Serie';
import { lastSerieDate } from '../../helpers/common/dateFunctions';
import { getFullSerieId } from "../../helpers/common/fullSerieID";
import { ICardBaseConfig } from '../../indexCard';
import LocaleValueFormatter, { ILocaleValueFormatterConfig } from '../../helpers/common/LocaleValueFormatter';
import FullCardContainer from '../style/exportable_card/FullCardContainer';
import FullCardHeader from '../style/exportable_card/FullCardHeader';
import FullCardSource from '../style/exportable_card/FullCardSource';
import FullCardUnits from '../style/exportable_card/FullCardUnits';
import FullCardValue from '../style/exportable_card/FullCardValue';
import FullCardChart from './FullCardChart';
import FullCardLinks from './FullCardLinks';
import { buildAbbreviationProps } from '../../helpers/common/numberAbbreviation';


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
    };
    const value = props.serie.data[props.serie.data.length-1].value;
    const abbreviationProps = buildAbbreviationProps(options.numbersAbbreviate, options.decimalsBillion, options.decimalsMillion);
    const formatterConfig: ILocaleValueFormatterConfig = {
        code: options.locale,
        decimalPlaces: options.decimals !== undefined && options.decimals >= 0 ? options.decimals : DEFAULT_SIGNIFICANT_FIGURES,
        decimalsBillion: abbreviationProps.decimalsBillion,
        decimalsMillion: abbreviationProps.decimalsMillion,
        explicitSign: options.explicitSign,
        isPercentage: props.serie.isPercentage,
        numbersAbbreviate: abbreviationProps.numbersAbbreviate
    }
    const formatter = new LocaleValueFormatter(formatterConfig);
        
    return (
        <FullCardContainer color={options.color}
                           hasChart={options.hasChart}
                           hasFrame={options.hasFrame}
                           hasColorBar={options.hasColorBar}
                           links={options.links}
                           serieId={options.serieId}
                           collapse={options.collapse}>
            <FullCardHeader color={options.color}
                            override={options.title}
                            defaultTitle={props.serie.description}
                            date={lastSerieDate(props.serie)} />
            <FullCardValue color={options.color} text={formatter.formatValue(value || 0)} />
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
