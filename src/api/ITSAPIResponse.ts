export default interface ITSAPIResponse {
    data: any[];
    meta: IMetaData[];
    params: any;
}

export interface IExtraMeta {
    end_date: string,
    frequency: string,
    start_date: string,
}

export interface ITSMeta {
    dataset: IDataSet[];
}

export type IMetaData = IExtraMeta | ITSMeta;

export interface IDataSet {
    distribution: IDistribution[];
    publisher: IPublisher;
}

export interface IDistribution {
    field: IField[];
}

export interface IField {
    id: string;
    title: string;
    description: string;
}

export interface IPublisher {
    mbox: string;
    name: string;
}
