import * as React from 'react';
import QueryParams from '../../api/QueryParams';
import { ISerie } from '../../api/Serie';
import SerieApi from '../../api/SerieApi';
import { ICardExportableConfig } from '../../indexCard';
import FullCard from '../exportable_card/FullCard';


export interface ICardExportableProps extends ICardExportableConfig {
    seriesApi: SerieApi;
}

interface ICardExportableState {
    serie: ISerie|null;
}

export default class CardExportable extends React.Component<ICardExportableProps, ICardExportableState> {

    public constructor(props: any) {
        super(props);

        this.state = {
            serie: null,
        }
    }

    public componentDidMount() {
        const percentChangeId = `${this.props.serieId}:percent_change_a_year_ago`
        const params = new QueryParams([this.props.serieId, percentChangeId]);
        params.setLast(1);
        this.fetchSeries(params);
    }

    public render() {
        if (!this.state.serie) { return null }

        return <FullCard serie={this.state.serie}
                            locale={this.props.locale}
                            color={this.props.color}
                            links={this.props.links} />
    }

    private fetchSeries(params: QueryParams) {
        this.props.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => this.setState({serie: series[0]}))
            .catch((error: any) => alert("Ocurrió un error buscando la serie solicitada."));
    }
}
