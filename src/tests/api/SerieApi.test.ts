import Serie from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import tsResponseMock from "./testConf";

function setupApi() {
    const api = SerieApi.withUri('http://exampĺe.it/mock/');
    const mockRp = jest.fn(() => Promise.resolve(tsResponseMock));
    api.apiClient.rp = mockRp;
    return { api, mockRp };
}

describe('SerieApi', () => {
    it('getSeries calls rp', () => {
        const { api, mockRp } = setupApi();

        api.getSeries(['serie_01'])

        expect(mockRp).toHaveBeenCalled();
    });

    it('getSeries returns a promise of Serie array', () => {

        const { api } = setupApi();

        api.getSeries(['serie_01']).then(
            returnedValue => {
                returnedValue.forEach(
                    each => expect(each instanceof Serie).toBe(true));
            }).catch(err => {
                throw new Error(err);
            });
    });

    it('getSeries returns a Serie object for each id passed', () => {

        const { api } = setupApi();

        api.getSeries(['serie_01']).then(
            returnedValue => {
                expect(returnedValue.length).toBe(1)
            }).catch(err => {
                throw new Error(err);
            });
    });
});
