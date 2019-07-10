import * as React from 'react';
import QueryParams from '../../api/QueryParams';
import { ISerie } from '../../api/Serie';
import SerieApi from '../../api/SerieApi';
import { valuesFromObject } from '../../helpers/commonFunctions';
import { ICardExportableConfig } from '../../indexCard';
import FullCard from '../exportable_card/FullCard';


export interface ICardExportableProps extends ICardExportableConfig {
    seriesApi: SerieApi;
}

interface ICardExportableState {
    serie: ISerie | null;
    laps: number;
}

const LAPS = {
    Anual: 10,
    Diaria: 90,
    Mensual: 24,
    Semestral: 10,
    Trimestral: 20,
}

export default class CardExportable extends React.Component<ICardExportableProps, ICardExportableState> {

    public constructor(props: any) {
        super(props);

        this.state = {
            laps: 0,
            serie: null,
        }
    }

    public componentDidMount() {
        const params = new QueryParams([this.props.serieId]);
        params.setLast(higherLaps());
        this.fetchSeries(params);
    }

    public render() {
        if (!this.state.serie) { return null }

        return <FullCard serie={this.state.serie} {...this.cardOptions()}/>
    }

    private cardOptions() {
        return {
            cardOptions: {
                chartType: this.props.chartType,
                color: this.props.color,
                explicitSign: this.props.explicitSign,
                hasChart: this.props.hasChart,
                hasFrame: this.props.hasFrame,
                links: this.props.links,
                locale: this.props.locale,
                source: this.props.source,
                title: this.props.title,
                units:this.props.units
            },
            downloadUrl: this.getDownloadUrl(),
            laps: this.state.laps,
        }

    }

    private fetchSeries(params: QueryParams) {
        this.props.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => {
                this.setState({
                    laps: LAPS[series[0].accrualPeriodicity],
                    serie: series[0]
                })
            })
    }

    private getDownloadUrl(): string {
        const params = new QueryParams([this.props.serieId]);
        params.setLast(5000);
        return this.props.seriesApi.downloadDataURL(params)
    }
}


function higherLaps(): number {
    return Math.max.apply(null, valuesFromObject(LAPS))
}
