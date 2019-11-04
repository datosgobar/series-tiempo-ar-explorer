import { ICardExportableProps } from "../../../components/exportable/CardExportable";

export function generateCommonMockCardOptions(): any {
    return {
        chartType: "line",
        color: "#047FBC",
        decimalsBillion: 2,
        decimalsMillion: 2,
        explicitSign: true,
        hasChart: "full",
        links: "full",
        locale: "AR",
        source: undefined,
        title: undefined,
        units: undefined
    }
}

export function generateBasicMockCardExportableProps(): ICardExportableProps {
    return {
        chartType: "line",
        color: "#FC1622",
        decimals: 2,
        decimalsBillion: 3,
        decimalsMillion: 3,
        explicitSign: false,
        hasChart: "full",
        links: "small",
        locale: "AR",
        numbersAbbreviate: true,
        serieId: "116.4_TCRZE_2015_D_36_4",
        source: "Custom Card source",
        title: "Custom Card title",
        units: "Custom Card units"
    }
}