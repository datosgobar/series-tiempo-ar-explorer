import axios from "axios";
import {AxiosInstance} from "axios";
import * as urljoin from "url-join";


export interface IApiClientOpt {
    uri: string;
    qs?: any;
}

export class ApiClient {

    constructor(private uri: string, private axiosInstance: AxiosInstance = axios) {
    }

    public get<T>(options: IApiClientOpt): Promise<T> {
        const {uri, qs} = options;
        return this.axiosInstance.get<T>(uri, {params: qs}).
        then(axionResponse => Promise.resolve(axionResponse.data));
    }


    public endpoint(endpointPath: string, trailingSlash: boolean = true): string {
        let fullPath = urljoin(this.uri, endpointPath);
        fullPath = fullPath.endsWith('/') ? fullPath : fullPath + '/';
        fullPath = trailingSlash? fullPath : fullPath.slice(0, -1);
        return fullPath
    }
}
