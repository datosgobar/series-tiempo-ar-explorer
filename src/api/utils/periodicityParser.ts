const ACCRUAL_PERIODICITY_TRANSLATOR = {
    'R/P1D': 'Diaria',
    'R/P1M': 'Mensual',
    'R/P1Y': 'Anual',
    'R/P3M': "Trimestral",
    'R/P6M': "Semestral",
};

const NOT_FOUND_PERIODICITY = 'No definido';

export class PeriodicityParser {

    public static format(value: string) {
        return ACCRUAL_PERIODICITY_TRANSLATOR[value] || NOT_FOUND_PERIODICITY;
    }

}