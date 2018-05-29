import ITSAPIResponse from "../../../api/ITSAPIResponse";


export function generateITSAPIResponse(): ITSAPIResponse {

    const data = [
        [
            "2017-10-01",
            128.1
        ],
        [
            "2017-11-01",
            125.9
        ]
    ];
    const meta = [
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
        ];

    const params = {
        "identifiers": [
            {
                "dataset": "1",
                "distribution": "1.1",
                "id": "example field id"
            }
        ],
        "ids": "example field id",
        "metadata": "full"
    };

    return {
        "data": data,
        "meta": meta,
        "params": params,
    }
}

export const tsResponseMock: ITSAPIResponse = generateITSAPIResponse();
