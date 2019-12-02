import * as React from "react";
import { ApiClient } from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import { DEFAULT_SIGNIFICANT_FIGURES, ISerie } from "../../api/Serie";
import SerieApi, { METADATA } from "../../api/SerieApi";
import { buildAbbreviationProps } from "../../helpers/common/numberAbbreviation";
import { IPreviewCardExportableConfig } from "../../indexPreviewCard";
import SerieCardWithChart from "../style/Card/Serie/SerieCardWithChart";
import PreviewCardContainer from "../style/ExportablePreviewCard/PreviewCardContainer";
import { getAPIDefaultURI, getClickTarget } from "../../helpers/previewCard/linkGenerators";


type IPreviewCardExportableProps = IPreviewCardExportableConfig;

interface IPreviewCardExportableState {
    serie: ISerie | null;
}

const DEFAULT_PREVIEW_CARD_WIDTH = "100%";

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

        if (!this.state.serie) { return null; }

        const abbreviationProps = buildAbbreviationProps(this.props.numbersAbbreviate, this.props.decimalsBillion, this.props.decimalsMillion);
        return(
            <PreviewCardContainer clickTarget={getClickTarget(this.props)} width={this.props.width || DEFAULT_PREVIEW_CARD_WIDTH }>
                <SerieCardWithChart serie={this.state.serie}
                                    locale="AR"
                                    maxDecimals={this.props.maxDecimals || DEFAULT_SIGNIFICANT_FIGURES}
                                    numbersAbbreviate={abbreviationProps.numbersAbbreviate}
                                    decimalsBillion={abbreviationProps.decimalsBillion}
                                    decimalsMillion={abbreviationProps.decimalsMillion}
                                    connectedChart={false} />
            </PreviewCardContainer>
        );

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