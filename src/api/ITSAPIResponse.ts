import SearchResult from "./SearchResult";

export interface ISearchResponse {
    count: number;
    result: SearchResult[];
}

export interface ITSAPIResponse {
    count: number;
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

export interface IDataSetTheme {
    id: string;
    descripcion: string;
    label: string;
}

export interface IDataSet {
    publisher: IPublisher;
    title: string;
    source: string;
    identifier: string;
    landingPage: string;
    theme: IDataSetTheme[];
    accrualPeriodicity: string;
}

export interface IDistribution {
    description: string;
    title: string;
    identifier: string;
    issued: string;
    modified: string;
}

export interface IField {
    id: string;
    title: string;
    description: string;
    units: string;
    frequency: string;
    time_index_start: string;
    time_index_end: string;
}

export interface IPublisher {
    mbox: string;
    name: string;
}
