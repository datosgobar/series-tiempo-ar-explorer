import Serie from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import {tsResponseMock} from "../support/factories/series_api";

function setupApi() {
    const api = SerieApi.withUri('http://exampĺe.it/mock/');
    const mockRp = jest.fn(() => Promise.resolve(tsResponseMock));
    api.apiClient.rp = mockRp;
    return {api, mockRp};
}

describe('SerieApi', () => {
    it('getSeries by ids returns a promise of iterable with series', () => {
        const {api, mockRp} = setupApi();

        api.getSeries(['serie_01']).then((returnedValue) => {
            returnedValue.forEach(each => expect(each instanceof Serie).toBe(true));
            expect(returnedValue.length).toBe(1);
        }).catch(err => {
                throw new Error(err);
            }
        );

        expect(mockRp).toHaveBeenCalledTimes(1);
    });
});

