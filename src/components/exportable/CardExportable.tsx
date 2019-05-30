import * as React from 'react';
import { ApiClient } from '../../api/ApiClient';
import QueryParams from '../../api/QueryParams';
import { ISerie } from '../../api/Serie';
import SerieApi from '../../api/SerieApi';
import { shortLocaleDate } from '../../helpers/dateFunctions';
import { buildLocale } from '../common/locale/buildLocale';


export interface ICardExportableProps {
    serieId: string;
    locale: string;
    links: string;
    color?: string;
    hasChart: string;
    chartType: string;
    title?: string;
    source?: string;
}

interface ICardExportableState {
    serie: ISerie|null;
}

export default class CardExportable extends React.Component<ICardExportableProps, ICardExportableState> {
    private seriesApi: SerieApi;

    public constructor(props: any) {
        super(props);

        this.seriesApi = new SerieApi(new ApiClient(buildURLfromSerieId(props.serieId), 'ts-components-card'));
        this.state = {
            serie: null
        }
    }

    public componentDidMount() {
        const params = new QueryParams([this.props.serieId]);
        this.fetchSeries(params);
    }

    public render() {
        if (this.state.serie) {
            return (
                <div>
                    <strong>{this.state.serie.description}</strong>
                    <h5>{shortLocaleDate(this.state.serie.accrualPeriodicity, this.state.serie.data[this.state.serie.data.length - 1].date)}</h5>
                    <h1>{buildLocale(this.props.locale).toDecimalString(this.state.serie.data[this.state.serie.data.length - 1].value)}</h1>
                    <h5>{this.state.serie.datasetTitle}</h5>
                    <h3>-1,19% interanual</h3>
                    <h5>{this.state.serie.datasetSource}</h5>
                </div>
            )
        }

        return null
    }

    private fetchSeries(params: QueryParams) {
        this.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => this.setState({serie: series[0]}))
            .catch((error: any) => alert("Ocurrió un error buscando la serie solicitada."));
    }
}


function buildURLfromSerieId(serieId: string): string {
    return `https://apis.datos.gob.ar/series/api/series?ids=${serieId}`
}
