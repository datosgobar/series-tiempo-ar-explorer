import { formattedDateString, fullLocaleDate, shortLocaleDate, lastSerieDate } from "../../../helpers/common/dateFunctions";
import { ISerie } from "../../../api/Serie";
import { generateCommonMockSerieEMAE } from "../../support/mockers/seriesMockers";

describe("Tests for date handling functions", () => {

    describe("Formatting of a date string", () => {

        let dateString: string;
        let formattedString: string;

        it("Replaces slashes with dashes", () => {
            dateString = "2017/04/12";
            formattedString = formattedDateString(dateString);
            expect(formattedString).toEqual("2017-04-12");
        });
        it("A string with no slashes is kept the same", () => {
            dateString = "2005-03-09";
            formattedString = formattedDateString(dateString);
            expect(formattedString).toEqual(dateString);
        });
        it("If only one term is specified, a '-01' is appended", () => {
            dateString = "1996";
            formattedString = formattedDateString(dateString);
            expect(formattedString).toEqual("1996-01");
        });

    })

    describe("Obtainment of a full Locale-wise date", () => {

        let datetime: string;
        let frequency: string;
        let fullDate: string;

        beforeAll(() => {
            datetime = "2016-07-26";
        })

        it("'Anual' frequency returns only the year", () => {
            frequency = "Anual";
            fullDate = fullLocaleDate(frequency, datetime);
            expect(fullDate).toEqual("2016");
        });
        it("'Semestral' frequency returns both year and semester", () => {
            frequency = "Semestral";
            fullDate = fullLocaleDate(frequency, datetime);
            expect(fullDate).toEqual("2° semestre 2016");
        });
        it("'Trimestral' frequency returns both year and quarter", () => {
            frequency = "Trimestral";
            fullDate = fullLocaleDate(frequency, datetime);
            expect(fullDate).toEqual("3° trimestre 2016");
        });
        it("'Mensual' frequency returns both year and a verbose month", () => {
            frequency = "Mensual";
            fullDate = fullLocaleDate(frequency, datetime);
            expect(fullDate).toEqual("Julio 2016");
        });
        it("'Diaria' frequency returns year, a verbose month and the day", () => {
            frequency = "Diaria";
            fullDate = fullLocaleDate(frequency, datetime);
            expect(fullDate).toEqual("26 Julio, 2016");
        });
        it("Other frequencies are not supported, hence they return a failure message", () => {
            frequency = "Bimestral";
            fullDate = fullLocaleDate(frequency, datetime);
            expect(fullDate).toEqual("Frecuencia no soportada");
        });

    })

    describe("Obtainment of a shortened Locale-wise date", () => {

        let datetime: string;
        let frequency: string;
        let shortDate: string;

        beforeAll(() => {
            datetime = "2018-12-09";
        })

        it("'Anual' frequency returns only the year", () => {
            frequency = "Anual";
            shortDate = shortLocaleDate(frequency, datetime);
            expect(shortDate).toEqual("2018");
        });
        it("'Semestral' frequency returns both year's last two numbers and semester number", () => {
            frequency = "Semestral";
            shortDate = shortLocaleDate(frequency, datetime);
            expect(shortDate).toEqual("2S 18");
        });
        it("'Trimestral' frequency returns both year's last two numbers and quarter number", () => {
            frequency = "Trimestral";
            shortDate = shortLocaleDate(frequency, datetime);
            expect(shortDate).toEqual("4T 18");
        });
        it("'Mensual' frequency returns both year's last two numbers and a shortened month", () => {
            frequency = "Mensual";
            shortDate = shortLocaleDate(frequency, datetime);
            expect(shortDate).toEqual("dic. 18");
        });
        it("'Diaria' frequency returns year's last two numbers, a shortened month and the day", () => {
            frequency = "Diaria";
            shortDate = shortLocaleDate(frequency, datetime);
            expect(shortDate).toEqual("9 dic. 18");
        });
        it("Other frequencies are not supported, hence they return a failure message", () => {
            frequency = "Quincenal";
            shortDate = shortLocaleDate(frequency, datetime);
            expect(shortDate).toEqual("Frecuencia no soportada");
        });

    })

    describe("Obtainment of the last date of a Serie, for a Card's header", () => {

        let serie: ISerie;
        let lastDate: string;

        beforeAll(() => {
            serie = generateCommonMockSerieEMAE();
        })

        it("If specified, the serie's frequency is used for formatting", () => {
            lastDate = lastSerieDate(serie);
            expect(lastDate).toEqual("Abril 2019");
        });
        it("If no frequency is specified, accrual periodicity is usde", () => {
            serie.frequency = undefined;
            serie.accrualPeriodicity = "Semestral"
            lastDate = lastSerieDate(serie);
            expect(lastDate).toEqual("1° semestre 2019");
        });

    })

})