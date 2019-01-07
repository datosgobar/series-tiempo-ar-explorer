import { IDataPoint } from "../../api/DataPoint";
import {ITSAPIResponse, ITSMeta} from "../../api/ITSAPIResponse";
import Serie from "../../api/Serie";
import {generateITSAPIResponse} from "../support/factories/series_api";


const getTSMetadata = (tsResponse: ITSAPIResponse, index: number):ITSMeta => {
    return tsResponse.meta[index] as ITSMeta
};

describe('Serie', () => {

    const describeSerie = (serieIndex: number) => {
        let serie: Serie;
        let tsResponseMock: ITSAPIResponse;
        beforeEach(() => {
            tsResponseMock = generateITSAPIResponse();
            serie = new Serie(serieIndex, tsResponseMock);
        });
        describe("Serie uses attributes from tsResponse", () => {
            it("uses field's id as id", () => {
                expect(serie.id).toBe(getTSMetadata(tsResponseMock, serieIndex).field.id);
            });
            it("uses dataset's publisher as publisher", () => {
                expect(serie.publisher.name).toBe(getTSMetadata(tsResponseMock,serieIndex).dataset.publisher.name);
            });
            it("uses field's title as title", () => {
                expect(serie.title).toBe(getTSMetadata(tsResponseMock,serieIndex).field.title);
            });
            it("uses datasetTitle from dataset.title", () => {
                expect(serie.datasetTitle).toBe(getTSMetadata(tsResponseMock, serieIndex).
                    dataset.title);
            });
            it("uses data at 0 as date", () => {
                serie.data.forEach((dataPoint: IDataPoint, index: number) => {
                    expect(dataPoint.date).toBe(tsResponseMock.data[index][0]);
                });
            });
            it("uses data at 1 as value", () => {
                serie.data.forEach((dataPoint: IDataPoint, index: number) => {
                    expect(dataPoint.value).toBe(tsResponseMock.data[index][1]);
                });
            });

        });
    };
    describe("Multiples series from same tsResponse", () => {
        describeSerie(1);
        describeSerie(2);
    });

});
