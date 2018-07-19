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

    public getPaginated<T>(options: IApiClientOpt): Promise<T> {
        return this.getPaginatedSeries(options, []).
        then(axionResponse => Promise.resolve(axionResponse.data));
    }

    public endpoint(endpointPath: string, trailingSlash: boolean = true): string {
        const fullPath = urljoin(this.uri, endpointPath, '/');
        return trailingSlash? fullPath : fullPath.slice(0, -1);
    }

    private getPaginatedSeries(options: IApiClientOpt, result: Array<Promise<any>>): Promise<any> {
        return this.axiosInstance.get<any>(options.uri, {params: options.qs})
            .then((response: any): Promise<any> => {
                response.data = result.concat(response.data); // para series, la lista esta en response.data.data

                if (response.data.length === response.count) {
                    return Promise.resolve(response);
                } else {
                    if (options.qs.offset !== undefined) {
                        options.qs.offset = options.qs.offset + options.qs.limit;
                    } else {
                        options.qs.start = options.qs.start + options.qs.limit;
                    }

                    return this.getPaginatedSeries(options, response.data);
                }
            });
    }
}
