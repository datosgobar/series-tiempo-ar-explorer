import { ISerie } from "../../../api/Serie"
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos, generateYearlyFrequencySerie, generateDailyFrequencySerie } from "../../support/mockers/seriesMockers";
import { appropiatedFrequency, frequencyOptions } from "../../../helpers/graphic/optionSelectors";
import { IPickerOptionsProps } from "../../../components/common/picker/OptionsPicker";

describe("Obtainment of the lowest common frequency between a group of series", () => {

    let serieOne: ISerie;
    let serieTwo: ISerie;
    let serieThree: ISerie;
    let series: ISerie[]; 
    let lowestFrequency: string; 
    
    beforeAll(() => {
        serieOne = generateCommonMockSerieEMAE();
        serieTwo = generateCommonMockSerieMotos();
        serieThree = generateYearlyFrequencySerie();
    })

    it("If there is only one serie, its frequency is the lowest", () => {
        series = [serieOne];
        lowestFrequency = appropiatedFrequency(series);
        expect(lowestFrequency).toEqual(serieOne.accrualPeriodicity);
    });
    it("If both series have the same frequency, such is the lowest", () => {
        series = [serieOne, serieTwo];
        lowestFrequency = appropiatedFrequency(series);
        expect(lowestFrequency).toEqual("Mensual");
    });
    it("The less frequent or smallest of the series' frequencies is considered the lowest one", () => {
        series = [serieOne, serieTwo, serieThree];
        lowestFrequency = appropiatedFrequency(series);
        expect(lowestFrequency).toEqual("Anual");
    });

})

describe("Obtainment of available options for a frequency selector", () => {

    let serieOne: ISerie;
    let serieTwo: ISerie;
    let serieThree: ISerie;
    let series: ISerie[]; 
    let finalOptions: IPickerOptionsProps[];

    function availableFrequencies(options: IPickerOptionsProps[]): string[] {

        const available = [];

        for (const option of options) {
            if (option.available) {
                available.push(option.title);
            }
        }

        return available;

    }

    beforeAll(() => {
        serieOne = generateCommonMockSerieEMAE();
        serieTwo = generateYearlyFrequencySerie();
        serieThree = generateDailyFrequencySerie();
    })

    it("Only the lowest common frequency and lower possible frequencies are available", () => {
        series = [serieOne, serieThree];
        finalOptions = frequencyOptions(series);
        expect(availableFrequencies(finalOptions)).toEqual(["Anual", "Semestral", "Trimestral", "Mensual"]);
    });
    it("If the lowest common frequency is yearly, only such is available", () => {
        series = [serieTwo, serieThree];
        finalOptions = frequencyOptions(series);
        expect(availableFrequencies(finalOptions)).toEqual(["Anual"]);
    });
    it("If the lowest common frequency is daily, every existing frequency is available", () => {
        series = [serieThree];
        finalOptions = frequencyOptions(series);
        expect(availableFrequencies(finalOptions)).toEqual(["Anual", "Semestral", "Trimestral", "Mensual", "Diaria"]);
    });

})