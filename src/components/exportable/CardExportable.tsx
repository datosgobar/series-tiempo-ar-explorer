import * as React from 'react';
import { ApiClient } from '../../api/ApiClient';
import QueryParams from '../../api/QueryParams';
import { ISerie, MAX_SIGNIFICANT_FIGURES } from '../../api/Serie';
import SerieApi, { METADATA } from '../../api/SerieApi';
import { valuesFromObject } from '../../helpers/common/commonFunctions';
import { ICardExportableConfig } from '../../indexCard';
import FullCard from '../exportable_card/FullCard';

export type ICardExportableProps = ICardExportableConfig;

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

    private seriesApi: SerieApi;

    public constructor(props: any) {
        super(props);

        this.seriesApi = new SerieApi(new ApiClient(props.apiBaseUrl || getDefaultURI(), 'ts-components-card'));

        this.state = {
            laps: 0,
            serie: null,
        }
    }

    public componentDidMount() {
        const params = new QueryParams([this.props.serieId]);
        if(this.props.collapse !== undefined) {
            params.setCollapse(this.props.collapse);
        }
        params.setLast(higherLaps());
        params.setMetadata(METADATA.FULL);
        this.fetchSeries(params);
    }

    public render() {
        if (!this.state.serie) { return null }

        return <FullCard serie={this.state.serie} {...this.cardOptions()}/>
    }

    public getDownloadUrl(): string {
        const params = new QueryParams([this.props.serieId]);
        params.setLast(5000);
        if(this.props.collapse !== undefined) {
            params.setCollapse(this.props.collapse);
        }
        return this.seriesApi.downloadDataURL(params)
    }

    private cardOptions() {

        let decimals = this.props.decimals;
        if(decimals === undefined && this.state.serie) {
            decimals = Math.min(this.state.serie.significantFigures, MAX_SIGNIFICANT_FIGURES);
        }

        return {
            cardOptions: {
                apiBaseUrl: this.props.apiBaseUrl,
                chartType: this.props.chartType,
                collapse: this.props.collapse,
                color: this.props.color,
                decimals,
                decimalsBillion: this.props.decimalsBillion,
                decimalsMillion: this.props.decimalsMillion,
                explicitSign: this.props.explicitSign,
                hasChart: this.props.hasChart,
                hasColorBar: this.props.hasColorBar,
                hasFrame: this.props.hasFrame,
                links: this.props.links,
                locale: this.props.locale,
                numbersAbbreviate: this.props.numbersAbbreviate,
                source: this.props.source,
                title: this.props.title,
                units: this.props.units,
                isPercentage: this.props.isPercentage 
            },
            downloadUrl: this.getDownloadUrl(),
            laps: this.state.laps,
        }

    }

    private fetchSeries(params: QueryParams) {
        this.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => {
                this.setState({
                    laps: LAPS[series[0].accrualPeriodicity],
                    serie: series[0]
                })
            })
    }

}


function higherLaps(): number {
    return Math.max.apply(null, valuesFromObject(LAPS))
}

function getDefaultURI(): string {
    return `https://apis.datos.gob.ar/series/api`
}