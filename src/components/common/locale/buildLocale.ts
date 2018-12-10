import LocaleAR from "./LocaleAR";
import LocaleDefault from "./LocaleDefault";
import LocaleUS from "./LocaleUS";

export function buildLocale(locale: string) {
    let localeClass = new LocaleDefault();

    if (locale === "AR") {
        localeClass = new LocaleAR();
    } else if (locale === "US") {
        localeClass = new LocaleUS();
    }

    return localeClass;
}
