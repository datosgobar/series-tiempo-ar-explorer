import ITSAPIResponse from "../../api/ITSAPIResponse";
import Serie from "../../api/Serie";
import SerieApi from "../../api/SerieApi";

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

const tsResponseMock: ITSAPIResponse = {
    "data": [
        [
            "2017-10-01",
            128.1
        ],
        [
            "2017-11-01",
            125.9
        ]
    ],
    "meta": [
        {
            "dataset": []
        },
        {
            "dataset": [
                {
                    "distribution": [
                        {
                            "field": [
                                {
                                    "description": "example field description",
                                    "id": "example field id",
                                    "title": "example field title",
                                }
                            ],
                        }
                    ],
                    "publisher": {
                        "mbox": "example@dataset.com",
                        "name": "example dataset publisher name"
                    },
                }
            ],
        }
    ],
    "params": {
        "identifiers": [
            {
                "dataset": "1",
                "distribution": "1.1",
                "id": "example field id"
            }
        ],
        "ids": "example field id",
        "metadata": "full"
    }
};
