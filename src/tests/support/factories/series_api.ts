import { ITSAPIResponse } from "../../../api/ITSAPIResponse";

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
            end_date: "2013-01-01",
            frequency: "year",
            start_date: "1993-01-01",
        },
        ...tsIDs.map((tsID) => {
            return {
                catalog: {
                    description: `${tsID} catalog description`,
                    identifier: `${tsID} catalog identifier`,
                    modified: `${tsID} catalog modified`,
                    publisher: {
                        mbox: `${tsID}@catalog.com`,
                        name: `${tsID} catalog publisher name`
                    },
                    title: `${tsID} catalog title`,
                },
                dataset: {
                    identifier: `${tsID} dataset identifier`,
                    publisher: {
                        mbox: `${tsID}@dataset.com`,
                        name: `${tsID} dataset publisher name`
                    },
                    source: `${tsID} dataset source`,
                    title: `${tsID} dataset title`,
                },
                distribution: {
                    description: `${tsID} distribution description`,
                    identifier: `${tsID} distribution identifier`,
                    title: `${tsID} distribution title`,
                    units: `${tsID} distribution units`,
                },
                field: {
                    description: `${tsID} field description`,
                    id: tsID,
                    title: `${tsID} field title`,
                    units: `${tsID} field units`,
                },

            }
        }
        )
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
