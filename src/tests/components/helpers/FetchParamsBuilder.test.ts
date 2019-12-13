import FetchParamsBuilder, { IFetchParamsBuildingConfig } from "../../../helpers/graphic/fetchParamsBuilder";
import QueryParams from "../../../api/QueryParams";

describe("Usage of a builder to obtain the params for fetching series at GraphicExportable", () => {

    let url: string;
    let builder: FetchParamsBuilder;
    let config: IFetchParamsBuildingConfig;
    let params: QueryParams;

    beforeAll(() => {
        url = 'https://apis.datos.gob.ar/series/api/series/?ids=122.2_CV_1999_0_12&start_date=2008-10-14&end_date=2014-05-09';
        builder = new FetchParamsBuilder(url);
    })

    describe("Building params without specifying a representationMode", () => {

        beforeAll(() => {
            config = {
                collapse: 'quarter',
                collapseAggregation: 'sum',
                ids: ['serieA:change', 'serieB', 'serieC']
            };
            params = builder.getParams(config);
        });

        it("The collapse param is copied as it is", () => {
            expect(params.getCollapse()).toEqual('quarter');
        });
        it("The collapse aggregation param is copied as it is", () => {
            expect(params.getCollapseAggregation()).toEqual('sum');
        });
        it("The ids are copied as they are and joined by ',' characters into a single string", () => {
            expect(params.getIds()).toEqual('serieA:change,serieB,serieC');
        });

    })

    describe("Building params specifying a representationMode", () => {

        beforeAll(() => {
            config = {
                collapse: 'month',
                collapseAggregation: 'min',
                ids: ['serieA', 'serieB:change_since_beginning_of_year'],
                representationMode: 'percent_change_a_year_ago'
            };
            params = builder.getParams(config);
        });

        it("The representation mode param is copied as it is", () => {
            expect(params.getRepresentationMode()).toEqual('percent_change_a_year_ago');
        });
        it("The ids are copied as they are, despite the representationMode", () => {
            expect(params.getIds()).toEqual('serieA,serieB:change_since_beginning_of_year');
        });

    })

})