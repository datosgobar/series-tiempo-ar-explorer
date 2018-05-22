import { IDataPoint } from "../../api/DataPoint";
import Serie from "../../api/Serie";
import tsResponseMock from "./testConf";


describe('Serie', () => {

    it('uses index to search throught TSResponse json', () => {
        const index: number = 1
        const serie: Serie = new Serie(index, tsResponseMock);

        serie.data.forEach((datapoint, dpIndex) => {

            expect(datapoint.value).toBe(tsResponseMock.data[dpIndex][index])
        });
    });

    it('id should be field id', () => {
        const index: number = 1
        const serie: Serie = new Serie(index, tsResponseMock);

        expect(serie.id).toBe(tsResponseMock.meta[index].dataset[0].distribution[0].field[0].id)
    });

    it('publisher must be distribution publisher', () => {
        const index: number = 1
        const serie: Serie = new Serie(index, tsResponseMock);

        const publisher = tsResponseMock.meta[index].dataset[0].publisher;
        expect(serie.publisher.mbox).toBe(publisher.mbox);
        expect(serie.publisher.name).toBe(publisher.name);
    });

    it('description must be field description', () => {
        const index: number = 1
        const serie: Serie = new Serie(index, tsResponseMock);

        expect(serie.description).toBe(tsResponseMock.meta[index].dataset[0].distribution[0].field[0].description)
    });

    it('title must be field title', () => {
        const index: number = 1
        const serie: Serie = new Serie(index, tsResponseMock);

        expect(serie.title).toBe(tsResponseMock.meta[index].dataset[0].distribution[0].field[0].title)
    });

    it('multiple series can use the same tsResponse', () => {

        const serie: Serie = new Serie(1, tsResponseMock);
        const serie2: Serie = new Serie(2, tsResponseMock);

        expect(serie.id === serie2.id).toBeFalsy();
    });
});
