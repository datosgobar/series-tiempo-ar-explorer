import { IAggregations, IMetaData, ITSAPIResponse } from "../../../api/ITSAPIResponse";
import Serie from "../../../api/Serie";

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

    const meta: IMetaData[] = [
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
                    accrualPeriodicity: `${tsID} dataset accrualPeriodisity`,
                    identifier: `${tsID} dataset identifier`,
                    landingPage: `${tsID} dataset landingPage`,
                    publisher: {
                        mbox: `${tsID}@dataset.com`,
                        name: `${tsID} dataset publisher name`
                    },
                    source: `${tsID} dataset source`,
                    theme: [{id: `${tsID} theme`, label: `${tsID} theme`, descripcion: `${tsID} theme`}],
                    title: `${tsID} dataset title`,
                },
                distribution: {
                    description: `${tsID} distribution description`,
                    downloadURL: `${tsID} distribution download URL`,
                    identifier: `${tsID} distribution identifier`,
                    issued: `${tsID} distribution issued`,
                    modified: `${tsID} distribution issued`,
                    representation_mode_units: `${tsID} distribution representation_mode_units`,
                    title: `${tsID} distribution title`,
                    units: `${tsID} distribution units`,
                },
                field: {
                    description: `${tsID} field description`,
                    frequency: `${tsID} field periodicity`,
                    hits_90_days: 892,
                    id: tsID,
                    is_percentage: true,
                    max_value: "2",
                    min_value: "0",
                    representation_mode: 'value',
                    representation_mode_units: `${tsID} distribution representation_mode_units`,
                    significant_figures: 2,
                    time_index_end: '',
                    time_index_size: 0,
                    time_index_start: '',
                    title: `${tsID} field title`,
                    units: `${tsID} field units`,
                },
            }
        }
        )
    ];

    const params = {
        identifiers: tsIDs.map(tsID => {
            return {
                "dataset": "1",
                "distribution": "1.1",
                "id": tsID
            }
        }),
        ids: tsIDs.join(","),
        metadata: "full"
    };

    return {
        aggregations: generateMockAggregations(),
        count: 1,
        data,
        meta,
        params,
    }
}

export const tsResponseMock: ITSAPIResponse = generateITSAPIResponse();

export function generateSeries(seriesIds = ["serie01", "serie02"]){
    const response = generateITSAPIResponse(seriesIds);
    return seriesIds.map((id, index) => new Serie(index+1, response));
}

export function generateMockAggregations(): IAggregations {
    return {
        catalog_id: [],
        dataset_publisher_name: [],
        dataset_source: [{
            label: 'A source',
            series_count: 1
        },{
            label: 'Another source',
            series_count: 4
        }],
        dataset_theme: [{
            label: 'Actividad',
            series_count: 2
        }],
        units: [],
    }
}