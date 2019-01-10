import * as moment from "moment";
import 'moment/locale/es'
import {capitalize} from "./commonFunctions";

export function timestamp(date: string): number {
    return new Date(date).getTime()
}

// returns a string in format YYYY/MM/DD with the missing parts of date
// '2010' => '2010/01/01
// '2010-03' or '2010/03' => '2010/03/01'
// '2010-03-01' or '2010/03/01' => '2010/03/01'
export function formattedDateString(date: string): string {
    const parsedDate  = date.replace(/([\/\-])/g, '-');
    return parsedDate.split('-').length === 1 ? `${parsedDate}-01` : parsedDate;
}

export function formattedMoment(date: any): string {
    return moment(date).format('YYYY-MM-DD');
}

export function localTimestamp(timestmp: number): number {
    return new Date(timestmp).setUTCHours(3);
}


// TODO: testear
export function fullLocaleDate(frequency: string, datetime: string|number) {
    moment.locale('es');
    const date = moment(datetime).utcOffset('+00:00');
    let result = 'Frecuencia no soportada';

    if (frequency === 'Anual') {
        result = date.format('YYYY');
    }

    if (frequency === 'Semestral') {
        const numberOfMonth = parseInt(date.format('M'), 10);
        const semester = Math.ceil(numberOfMonth / 6);

        result = semester + '° semestre ' + date.format('YYYY');
    }

    if (frequency === 'Trimestral') {
        const numberOfMonth = parseInt(date.format('M'), 10);
        const trimester = Math.ceil(numberOfMonth / 3);

        result = trimester + '° trimestre ' + date.format('YYYY');
    }

    if (frequency === 'Mensual') {
        result = capitalize(date.format('MMMM YY'));
    }

    if (frequency === 'Diaria') {
        result = capitalize(date.format('DD MMMM, YYYY'), 3);
    }

    return result;
}
