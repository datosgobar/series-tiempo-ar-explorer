import { ICardExportableProps } from "../../../components/exportable/CardExportable";

export function generateCommonMockCardOptions() {
    return {
        chartType: "line",
        color: "#047FBC",
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
        explicitSign: false,
        hasChart: "full",
        links: "small",
        locale: "AR",
        serieId: "116.4_TCRZE_2015_D_36_4",
        source: "Custom Card source",
        title: "Custom Card title",
        units: "Custom Card units"
    }
}