import * as moment from 'moment';


const NOT_FOUND_PERIODICITY = 'No definido';

const PERIODICITY_TRANSLATOR = {
    'R/P1D': 'Diaria',
    'R/P1M': 'Mensual',
    'R/P1Y': 'Anual',
    'R/P3M': "Trimestral",
    'R/P6M': "Semestral",
};

const PERIODICITY_DATE_FORMAT = {
    'R/P1D': 'YYYY-MM-DD',
    'R/P1M': 'YYYY-MM',
    'R/P1Y': 'YYYY',
    'R/P3M': 'YYYY-MM',
    'R/P6M': 'YYYY-MM',
};

export class PeriodicityParser {

    private periodicity: string;

    public constructor(periodicity: string) {
        this.periodicity = periodicity;
    }

    public formattedPeriodicity(): string {
        return PERIODICITY_TRANSLATOR[this.periodicity] || NOT_FOUND_PERIODICITY;
    }

    public formatDate(date: string) {
        return moment(date).format(PERIODICITY_DATE_FORMAT[this.periodicity]);
    }

}