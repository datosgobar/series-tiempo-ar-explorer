import { ISerie } from "../../api/Serie";

const DATE_FORMAT_BY_PERIODICITY= {
    day:      '%Y-%m-%d',
    month:    '%Y-%m',
    quarter:  '%Y-%m',
    semester: '%Y-%m',
    year:     '%Y',
};

export function dateFormatByPeriodicity(series: ISerie[]) {
    const frequency = series.length > 0 ? series[0].frequency || 'day' : 'day';

    return DATE_FORMAT_BY_PERIODICITY[frequency];
}