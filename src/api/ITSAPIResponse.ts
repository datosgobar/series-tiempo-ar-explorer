export default interface ITSAPIResponse {
    data: any[];
    meta: IMetaData[];
    params: any;
}

export interface IMetaData {
    dataset: IDataSet[];
}

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
