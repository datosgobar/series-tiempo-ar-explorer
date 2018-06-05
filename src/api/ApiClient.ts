import axios from "axios";
import {AxiosInstance} from "axios";


export interface IApiClientOpt {
    uri: string;
    qs: any;
}

export class ApiClient {

    constructor(private uri: string, private axiosInstance: AxiosInstance = axios) {
    }

    public get<T>(options: IApiClientOpt): Promise<T> {
        const {uri, qs} = options;
        return this.axiosInstance.get<T>(uri, {params: qs}).
        then(axionResponse => Promise.resolve(axionResponse.data));
    }


    public endpoint(endpointPath: string): string {
        let fullPath = [this.uri, endpointPath].join("/");
        fullPath = fullPath.endsWith('/') ? fullPath : fullPath + '/';
        return fullPath
    }
}
