import ITSAPIResponse from "../../../api/ITSAPIResponse";


export function generateITSAPIResponse(tsIDs: string[] = ["1.1", "1.2"]): ITSAPIResponse {

    const data = [
        [
            "2017-10-01",
        ],
        [
            "2017-11-01",
        ]
    ].map((singleData) => {
        return [singleData, ...tsIDs.map(tsID => {
            tsIDs.indexOf(tsID)
        })];
    });

    const meta = [
        {
            "dataset": []
        },
        ...tsIDs.map((tsID) => {
            return {
                "dataset": [
                    {
                        "distribution": [
                            {
                                "field": [
                                    {
                                        "description": `${tsID} field description`,
                                        "id": tsID,
                                        "title": `${tsID} field title`,
                                    }
                                ],
                            }
                        ],
                        "publisher": {
                            "mbox": `${tsID}@dataset.com`,
                            "name": `${tsID} dataset publisher name`
                        },
                    }
                ],
            }
        }),

    ];

    const params = {
        "identifiers": tsIDs.map(tsID => {
            return {
                "dataset": "1",
                "distribution": "1.1",
                "id": tsID
            }
        }),
        "ids": tsIDs.join(","),
        "metadata": "full"
    };

    return {
        "data": data,
        "meta": meta,
        "params": params,
    }
}

export const tsResponseMock: ITSAPIResponse = generateITSAPIResponse();
