import LocaleDefault from "./LocaleDefault";

export default class LocaleUS extends LocaleDefault{

    public toLocaleString(value: number): string {
        return value.toLocaleString('us-US');
    }

    public decimalSeparator(): string {
        return '.';
    }

    public thousandSeparator(): string {
        return ',';
    }

}
