import LocaleDefault from "./LocaleDefault";

export default class LocaleAR extends LocaleDefault {

    public toLocaleString(value: number): string {
        return value.toLocaleString('es-AR');
    }

    public decimalSeparator(): string {
        return ',';
    }

    public thousandSeparator(): string {
        return '.';
    }

}
