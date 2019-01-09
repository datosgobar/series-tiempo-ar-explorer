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

const PERIODICITY_LANG = {
    'day': 'Diaria',
    'month': 'Mensual',
    'quarter': 'Trimestral',
    'semester': 'Semestral',
    'year': 'Anual',
};

export class PeriodicityManager {

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

// returns if `higher` is higher than `newFrequency`
export function isHigherFrequency(higher: string, newFrequency: string): boolean {
    return (higher === 'Anual') ||
        (higher === 'Semestral' && newFrequency !== 'Anual') ||
        ((higher === 'Trimestral') && ((newFrequency !== 'Anual') && newFrequency !== 'Semestral')) ||
        (higher === 'Mensual' && ((newFrequency !== 'Anual') && (newFrequency !== 'Semestral') && (newFrequency !== 'Trimestral')))
}

export function parseFormatDate(format: string, dateString: string) {
    const date = moment(dateString).utcOffset('+00:00');

    if (format === 'Anual') {
        return date.format('YYYY');
    }

    if (format === 'Semestral') {
        const numberOfMonth = parseInt(date.format('M'), 10);
        const semester = Math.ceil(numberOfMonth / 6);

        return semester + 'S ' + date.format('YY');
    }

    if (format === 'Trimestral') {
        const numberOfMonth = parseInt(date.format('M'), 10);
        const trimester = Math.ceil(numberOfMonth / 3);

        return trimester + 'T ' + date.format('YY');
    }

    if (format === 'Mensual') {
        return date.format('MMM YY');
    }

    if (format === 'Diaria') {
        return date.format('D MMM YY');
    }

    return 'Frecuencia no soportada';
}

export function i18nFrequency(frequency: string): string {
    return PERIODICITY_LANG[frequency];
}