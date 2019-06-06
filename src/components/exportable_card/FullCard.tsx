import * as React from 'react';
import { ISerie } from '../../api/Serie';
import { fullLocaleDate } from '../../helpers/dateFunctions';
import { buildLocale } from '../common/locale/buildLocale';
import LocaleDefault from '../common/locale/LocaleDefault';
import D3LineChart from '../d3_charts/D3LineChart';
import FullCardHeader from '../style/exportable_card/FullCardHeader';
import FullCardValue from '../style/exportable_card/FullCardValue';
import FullCardLinks from './FullCardLinks';


interface IFullCardProps {
    serie: ISerie;
    locale: string;
    color: string;
    hasChart: string;
    laps: number;
}

export default class FullCard extends React.Component<IFullCardProps, any> {

    private locale: LocaleDefault;
    private readonly myRef: React.RefObject<any>;

    public constructor(props: IFullCardProps) {
        super(props);

        this.myRef = React.createRef();
        this.locale = buildLocale(props.locale);
    }

    public render() {
        return (
            <div className="full-card" ref={this.myRef}>
                <FullCardHeader color={this.props.color} title={this.props.serie.description} date={lastSerieDate(this.props.serie)} />
                <FullCardValue color={this.props.color} text={formattedValue(this.props.serie, this.locale)} />
                <D3LineChart renderTo={this.myRef} data={this.props.serie.data} />
                <span className="units">{this.props.serie.units}</span>
                <span className="source">Fuente: {this.props.serie.datasetSource}</span>
                <FullCardLinks serie={this.props.serie} />
            </div>
        )
    }

}

function lastSerieDate(serie: ISerie): string {
    return fullLocaleDate(serie.accrualPeriodicity, serie.data[serie.data.length-1].date);
}


function formattedValue(serie: ISerie, locale: LocaleDefault): string {
    const value: number = serie.data[serie.data.length-1].value;

    if (serie.isPercentage) {
        return `${(value * 100).toFixed(2)}%`
    } else {
        return locale.toDecimalString(value, 2);
    }
}
