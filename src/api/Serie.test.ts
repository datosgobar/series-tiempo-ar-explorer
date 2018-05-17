import { IDataPoint } from "./DataPoint";
import ITsResponse from "./ITsResponse";
import Serie  from "./Serie";

describe('Serie', () => {

    it('multiple series can use the same tsResponse', () => {

        const serie: Serie = new Serie(1, tsResponseMock);
        const serie2: Serie = new Serie(2, tsResponseMock);

        expect(serie.id).toBe("example field id");
        expect(serie.publisher.name).toBe("example dataset publisher name");
        expect(serie.title).toBe("example field title");
        expect(serie.description).toBe("example field description");

        serie.data.forEach((dataPoint: IDataPoint, index: number) => {
            expect(dataPoint.date).toBe(tsResponseMock.data[index][0]);
            expect(dataPoint.value).toBe(tsResponseMock.data[index][1]);
        });

        expect(serie2.id).toBe("example field id2");
        expect(serie2.publisher.name).toBe("example dataset publisher name2");
        expect(serie2.title).toBe("example field title2");
        expect(serie2.description).toBe("example field description2");

        serie2.data.forEach((dataPoint: IDataPoint, index: number) => {
            expect(dataPoint.date).toBe(tsResponseMock.data[index][0]);
            expect(dataPoint.value).toBe(tsResponseMock.data[index][2]);
        });
    });
});


const tsResponseMock: ITsResponse = {
    "data": [
        [
            "2017-10-01",
            128.1,
            128.2
        ],
        [
            "2017-11-01",
            125.1,
            125.2
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
        },
        {
            "dataset": [
                {
                    "distribution": [
                        {
                            "field": [
                                {
                                    "description": "example field description2",
                                    "id": "example field id2",
                                    "title": "example field title2",
                                }
                            ],
                        }
                    ],
                    "publisher": {
                        "mbox": "example@dataset.com2",
                        "name": "example dataset publisher name2"
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
