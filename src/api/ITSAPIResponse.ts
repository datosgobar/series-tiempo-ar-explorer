export interface ITSAPIResponse {
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
    catalog: ICatalog;
    dataset: IDataSet;
    distribution: IDistribution;
    field: IField;
}

export type IMetaData = IExtraMeta | ITSMeta;

export interface ICatalog {
    publisher: IPublisher;
    description: string;
    modified: string;
    title: string;
    identifier: string;
}

export interface IDataSet {
    publisher: IPublisher;
    title: string;
    source: string;
    identifier: string;
}

export interface IDistribution {
    description: string;
    title: string;
    identifier: string;
}

export interface IField {
    id: string;
    title: string;
    description: string;
    units: string;
    accuralPeriodicity: string;
    index:{
        start: string,
        end: string,
    };
}

export interface IPublisher {
    mbox: string;
    name: string;
}
