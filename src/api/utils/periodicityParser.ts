import * as moment from 'moment';


const NOT_FOUND_PERIODICITY = 'No definido';

const DEFAULT_FORMAT_DATE = 'YYYY-MM-DD';

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

    private frequency: string;

    public constructor(frequency: string) {
        this.frequency = frequency;
    }

    public formattedPeriodicity(): string {
        return PERIODICITY_TRANSLATOR[this.frequency] || NOT_FOUND_PERIODICITY;
    }

    public formatDate(date: string) {
        return moment(date).format(PERIODICITY_DATE_FORMAT[this.frequency]) || DEFAULT_FORMAT_DATE;
    }

}