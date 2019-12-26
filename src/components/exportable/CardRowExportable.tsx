import * as React from "react";
import { ISerie } from "../../api/Serie";
import SerieApi, { METADATA } from "../../api/SerieApi";
import { ApiClient } from "../../api/ApiClient";
import { getAPIDefaultURI } from "../../helpers/previewCard/linkGenerators";
import QueryParams from "../../api/QueryParams";
import { getCardColor } from "../style/Colors/Color";
import { DEFAULT_DECIMALS_BILLION, DEFAULT_DECIMALS_MILLION } from "../../helpers/common/LocaleValueFormatter";
import { ICardRowExportableConfig } from "../../indexCardRow";
import FullCard from "../exportable_card/FullCard";
import { ICardBaseConfig } from "../../indexCard";

export type ICardRowExportableProps = ICardRowExportableConfig;

interface ICardRowExportableState {
    series: ISerie[] | null;
}

const LAPS = {
    Anual: 10,
    Diaria: 90,
    Mensual: 24,
    Semestral: 10,
    Trimestral: 20,
}

export default class CardRowExportable extends React.Component<ICardRowExportableProps, ICardRowExportableState> {

    private seriesApi: SerieApi;
    private idsAmount: number;

    private colors: string[];
    private decimals: number[];
    private decimalsBillion: number[];
    private decimalsMillion: number[];
    private explicitSigns: boolean[];
    private numbersAbbreviate: boolean[];
    private sources: string[];
    private titles: string[];
    private units: string[];

    public constructor(props: ICardRowExportableProps) {
        super(props);

        this.seriesApi = new SerieApi(new ApiClient(props.apiBaseUrl || getAPIDefaultURI(), 'ts-components-row'));
        this.idsAmount = this.props.ids.length;

        this.colors = [];
        this.decimals = [];
        this.decimalsBillion = [];
        this.decimalsMillion = [];
        this.explicitSigns = [];
        this.numbersAbbreviate = [];
        this.sources = [];
        this.titles = [];
        this.units = [];

        this.checkColor();
        this.checkDecimals();
        this.checkDecimalsBillion();
        this.checkDecimalsMillion();
        this.checkExplicitSign();
        this.checkNumbersAbbreviate();
        this.checkSource();
        this.checkTitle();
        this.checkUnits();

        this.state = {
            series: null
        }
    }

    public componentDidMount() {
        const params = new QueryParams(this.props.ids);
        if(this.props.collapse !== undefined) {
            params.setCollapse(this.props.collapse);
        }
        params.setLast(5000);
        params.setMetadata(METADATA.FULL);
        this.fetchSeries(params);
    }

    public render() {

        if (!this.state.series) { return null; }

        const rowsAmount = Math.floor(this.idsAmount / 4) + 1;
        const rows = [];

        for (let i = 0; i < rowsAmount; i++) {

            const cards = [];
            for (let j = i*4; j < (i+1)*4 && j < this.idsAmount; j++) {
                
                const downloadUrl = this.getDownloadUrl(this.props.ids[j]);
                const laps = LAPS[this.state.series[j].accrualPeriodicity];
                const cardOptions: ICardBaseConfig = {
                    chartType: "line",
                    collapse: this.props.collapse,
                    color: this.colors[j],
                    decimals: this.decimals[j],
                    decimalsBillion: this.decimalsBillion[j],
                    decimalsMillion: this.decimalsMillion[j],
                    explicitSign: this.explicitSigns[j],
                    hasChart: this.props.hasChart,
                    hasColorBar: this.props.hasColorBar,
                    hasFrame: this.props.hasFrame,
                    isPercentage: this.props.isPercentage,
                    links: this.props.links,
                    locale: this.props.locale,
                    numbersAbbreviate: this.numbersAbbreviate[j],
                    source: this.sources[j],
                    title: this.titles[j],
                    units: this.units[j]
                }

                cards.push(<FullCard serie={this.state.series[j]}
                                     downloadUrl={downloadUrl}
                                     laps={laps}
                                     cardOptions={cardOptions}/>);
                                     
            }

            rows.push(<div className="r-row">{cards}</div>)
        }

        return(
            <div>
                {rows}
            </div>
        );

    }

    private checkColor() {

        if (Array.isArray(this.props.color)) {
            if(this.props.color.length !== this.props.ids.length) {
                throw new Error(`El parametro color debe ser un array de igual longitud al parametro ids, o bien un string solo`);
            }
            this.colors = this.props.color;
        }
        else {
            const color = getCardColor(this.props.color);
            for (let step = 0; step < this.idsAmount; step++) {
                this.colors.push(color);
            }
        }

    }

    private checkDecimals() {

        if (Array.isArray(this.props.decimals)) {
            if(this.props.decimals.length !== this.props.ids.length) {
                throw new Error(`El parametro decimals debe ser un array de igual longitud al parametro ids, o bien un numero solo`);
            }
            this.decimals = this.props.decimals;
        }
        else if (this.props.decimals !== undefined) {
            for (let step = 0; step < this.idsAmount; step++) {
                this.decimals.push(Math.max(this.props.decimals, 0));
            }
        }

    }

    private checkDecimalsBillion() {

        if (Array.isArray(this.props.decimalsBillion)) {
            if(this.props.decimalsBillion.length !== this.props.ids.length) {
                throw new Error(`El parametro decimalsBillion debe ser un array de igual longitud al parametro ids, o bien un numero solo`);
            }
            this.decimalsBillion = this.props.decimalsBillion;
        }
        else if (this.props.decimalsBillion) {
            const decimalsBillion = this.props.decimalsBillion !== undefined && this.props.decimalsBillion >= 0 ? this.props.decimalsBillion : DEFAULT_DECIMALS_BILLION;
            for (let step = 0; step < this.idsAmount; step++) {
                this.decimalsBillion.push(decimalsBillion);
            }
        }

    }

    private checkDecimalsMillion() {

        if (Array.isArray(this.props.decimalsMillion)) {
            if(this.props.decimalsMillion.length !== this.props.ids.length) {
                throw new Error(`El parametro decimalsMillion debe ser un array de igual longitud al parametro ids, o bien un numero solo`);
            }
            this.decimalsMillion = this.props.decimalsMillion;
        }
        else if (this.props.decimalsMillion) {
            const decimalsMillion = this.props.decimalsMillion !== undefined && this.props.decimalsMillion >= 0 ? this.props.decimalsMillion : DEFAULT_DECIMALS_MILLION;
            for (let step = 0; step < this.idsAmount; step++) {
                this.decimalsMillion.push(decimalsMillion);
            }
        }

    }

    private checkExplicitSign() {

        if (Array.isArray(this.props.explicitSign)) {
            if(this.props.explicitSign.length !== this.props.ids.length) {
                throw new Error(`El parametro explicitSign debe ser un array de igual longitud al parametro ids, o bien un booleano solo`);
            }
            this.explicitSigns = this.props.explicitSign;
        }
        else {
            const explicitSign = this.props.explicitSign !== undefined ? this.props.explicitSign : false;
            for (let step = 0; step < this.idsAmount; step++) {
                this.explicitSigns.push(explicitSign);
            }
        }

    }

    private checkNumbersAbbreviate() {

        if (Array.isArray(this.props.numbersAbbreviate)) {
            if(this.props.numbersAbbreviate.length !== this.props.ids.length) {
                throw new Error(`El parametro numbersAbbreviate debe ser un array de igual longitud al parametro ids, o bien un booleano solo`);
            }
            this.numbersAbbreviate = this.props.numbersAbbreviate;
        }
        else {
            const numbersAbbreviate = this.props.numbersAbbreviate !== undefined ? this.props.numbersAbbreviate : true;
            for (let step = 0; step < this.idsAmount; step++) {
                this.numbersAbbreviate.push(numbersAbbreviate);
            }
        }

    }

    private checkSource() {

        if (Array.isArray(this.props.source)) {
            if(this.props.source.length !== this.props.ids.length) {
                throw new Error(`El parametro source debe ser un array de igual longitud al parametro ids, o bien un string solo`);
            }
            this.sources = this.props.source;
        }
        else {
            for (let step = 0; step < this.idsAmount; step++) {
                this.sources.push(this.props.source);
            }
        }

    }

    private checkTitle() {

        if (Array.isArray(this.props.title)) {
            if(this.props.title.length !== this.props.ids.length) {
                throw new Error(`El parametro title debe ser un array de igual longitud al parametro ids, o bien un string solo`);
            }
            this.titles = this.props.title;
        }
        else {
            for (let step = 0; step < this.idsAmount; step++) {
                this.titles.push(this.props.title);
            }
        }

    }

    private checkUnits() {

        if (Array.isArray(this.props.units)) {
            if(this.props.units.length !== this.props.ids.length) {
                throw new Error(`El parametro units debe ser un array de igual longitud al parametro ids, o bien un string solo`);
            }
            this.units = this.props.units;
        }
        else {
            for (let step = 0; step < this.idsAmount; step++) {
                this.units.push(this.props.units);
            }
        }

    }

    private fetchSeries(params: QueryParams) {
        this.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => {
                this.setState({
                    series
                })
            })
    }

    private getDownloadUrl(serieId: string): string {
        const params = new QueryParams([serieId]);
        params.setLast(5000);
        if(this.props.collapse !== undefined) {
            params.setCollapse(this.props.collapse);
        }
        return this.seriesApi.downloadDataURL(params);
    }

}
