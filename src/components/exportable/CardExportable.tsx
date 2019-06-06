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
    serie: ISerie|null;
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
        const percentChangeId = `${this.props.serieId}:percent_change_a_year_ago`
        const params = new QueryParams([this.props.serieId, percentChangeId]);
        params.setLast(higherLaps());
        this.fetchSeries(params);
    }

    public render() {
        if (!this.state.serie) { return null }

        return <FullCard serie={this.state.serie}
                            locale={this.props.locale}
                            color={this.props.color}
                            hasChart={this.props.hasChart}
                            laps={this.state.laps} />
    }

    private fetchSeries(params: QueryParams) {
        this.props.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => {
                this.setState({
                    laps: LAPS[series[0].accrualPeriodicity],
                    serie: series[0]
                })
            })
            .catch((error: any) => alert(`Ocurrió un error buscando la serie ${params.getIds()[0]}.`));
    }
}


function higherLaps(): number {
    return Math.max.apply(null, valuesFromObject(LAPS))
}
