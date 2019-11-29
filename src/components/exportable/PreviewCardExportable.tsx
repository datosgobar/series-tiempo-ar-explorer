import * as React from "react";
import { ApiClient } from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import { ISerie } from "../../api/Serie";
import SerieApi, { METADATA } from "../../api/SerieApi";
import { IPreviewCardExportableConfig } from "../../indexPreviewCard";
import PreviewCardContainer from "../style/ExportablePreviewCard/PreviewCardContainer";
import SerieCardWithChart from "../style/Card/Serie/SerieCardWithChart";

// import FullCardValue from "../style/exportable_card/FullCardValue";

type IPreviewCardExportableProps = IPreviewCardExportableConfig;

interface IPreviewCardExportableState {
    serie: ISerie | null;
}

export default class PreviewCardExportable extends React.Component<IPreviewCardExportableProps, IPreviewCardExportableState> {

    private seriesApi: SerieApi;

    public constructor(props: any) {
        super(props);

        this.seriesApi = new SerieApi(new ApiClient(props.apiBaseUrl || getAPIDefaultURI(), 'ts-components-preview'));

        this.state = {
            serie: null
        }
    }

    public componentDidMount() {
        const params = new QueryParams([this.props.serieId]);
        params.setLast(5000);
        params.setMetadata(METADATA.FULL);
        this.fetchSeries(params);
    }

    public render() {

        if (!this.state.serie) { return null }
        return(
            <PreviewCardContainer clickTarget={getClickTarget(this.props)}>
                <SerieCardWithChart serie={this.state.serie}
                                    locale="AR"
                                    maxDecimals={2}
                                    numbersAbbreviate={true}
                                    decimalsBillion={2}
                                    decimalsMillion={2}
                                    connectedChart={false} />
            </PreviewCardContainer>
        );
        /* <SerieCardWithChart serie={this.state.serie}
                                    locale="AR"
                                    maxDecimals={2}
                                    numbersAbbreviate={true}
                                    decimalsBillion={2}
                                    decimalsMillion={2} /> */

    }

    private fetchSeries(params: QueryParams) {
        this.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => {
                this.setState({
                    serie: series[0]
                })
            })
    }

}

function getAPIDefaultURI(): string {
    return `https://apis.datos.gob.ar/series/api`
}

const SERIES_EXPLORER_DEFAULT_URL = "https://datos.gob.ar/series/api/series";

export function getClickTarget(config: IPreviewCardExportableConfig): string {

    const baseUrl: string = config.explorerUrl || config.apiBaseUrl || SERIES_EXPLORER_DEFAULT_URL;
    return `${baseUrl}/?ids=${config.serieId}`;

}