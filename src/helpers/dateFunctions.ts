import * as moment from "moment";


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

export function localDate(timestmp: number): number {
    return new Date(timestmp).setUTCHours(3);
}