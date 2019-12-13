import { IPickerOptionsProps } from "../../components/common/picker/OptionsPicker";
import { ISerie } from "../../api/Serie";
import { isLowerFrequency } from "../../api/utils/periodicityManager";

export const CHART_TYPE_OPTIONS: IPickerOptionsProps[] = [
    { value: "line", title: "Líneas", available: true },
    { value: "column", title: "Columnas", available: true },
    { value: "area", title: "Áreas", available: true }
];

export const UNIT_OPTIONS: IPickerOptionsProps[] = [
    { value: "value", title: "Unidades originales", available: true },
    { value: "change", title: "Variación", available: true },
    { value: "change_a_year_ago", title: "Variación interanual", available: true },
    { value: "change_since_beginning_of_year", title: "Variación acumulada anual", available: true },
    { value: "percent_change", title: "Variación porcentual", available: true },
    { value: "percent_change_a_year_ago", title: "Variación porcentual interanual", available: true },
    { value: "percent_change_since_beginning_of_year", title: "Variación porcentual acumulada anual", available: true }
];

export const AGGREGATION_OPTIONS: IPickerOptionsProps[] = [
    { value: "avg", title: "Promedio", available: true },
    { value: "sum", title: "Suma", available: true },
    { value: "min", title: "Mínimo", available: true },
    { value: "max", title: "Máximo", available: true },
    { value: "end_of_period", title: "Último valor del período", available: true }
];

export function appropiatedFrequency(series: ISerie[]): string {

    let higherFrequency = series[0].accrualPeriodicity;
    series.forEach((serie: ISerie) => {
        if (isLowerFrequency(serie.accrualPeriodicity, higherFrequency)) {
            higherFrequency = serie.accrualPeriodicity;
        }
    });

    return higherFrequency;

}

export function frequencyOptions(series: ISerie[]): IPickerOptionsProps[] {

    const accrualPeriodicity = appropiatedFrequency(series);
    // noinspection TsLint
    const options = [
        { value: 'year',     title: 'Anual',      available: false },
        { value: 'semester', title: 'Semestral',  available: false },
        { value: 'quarter',  title: 'Trimestral', available: false },
        { value: 'month',    title: 'Mensual',    available: false },
        { value: 'day',      title: 'Diaria',     available: false },
    ];

    const optionIndex = options.findIndex((option: IPickerOptionsProps) => option.title === accrualPeriodicity);
    options.forEach((option: IPickerOptionsProps) => {
        option.available = options.indexOf(option) <= optionIndex;
    });

    return options;

}