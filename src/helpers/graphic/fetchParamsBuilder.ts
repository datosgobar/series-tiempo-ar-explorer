import QueryParams from "../../api/QueryParams";

export interface IFetchParamsBuildingConfig {
    collapse: string,
    collapseAggregation: string,
    ids: string[],
    representationMode?: string
}

export default class FetchParamsBuilder {

    private startDate: string;
    private endDate: string;

    public constructor(graphicUrl: string) {

        const url = new URLSearchParams(graphicUrl);
        this.startDate = url.get('start_date') || '';
        this.endDate = url.get('end_date') || '';

    }

    public getParams(config: IFetchParamsBuildingConfig): QueryParams {

        const params = new QueryParams(config.ids);
        params.setStartDate(this.startDate);
        params.setEndDate(this.endDate);
        
        params.setCollapse(config.collapse);
        params.setCollapseAggregation(config.collapseAggregation);
        if(config.representationMode !== undefined) {
            params.setRepresentationMode(config.representationMode);
        }

        return params;

    }


}