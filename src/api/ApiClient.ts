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
        const fullPath = urljoin(this.uri, endpointPath, '/');
        return trailingSlash? fullPath : fullPath.slice(0, -1);
    }

    public getAll(options: IApiClientOpt, prevResults: Array<Promise<any>>): Promise<any> {
        return this.get<any>(options)
            .then((response: any): Promise<any> => {

                if (this.needToFetchMoreData(response.data, options.qs.limit)) {
                    this.addData(response, prevResults);
                    this.increaseOffset(options);

                    return this.getAll(options, response.data);
                }

                this.addData(response, prevResults);
                return Promise.resolve(response);
            });
    }

    private addData(response: any, result: any[]) {
        response.data = result.concat(response.data);
    }

    private needToFetchMoreData(result: any[], limit: number): boolean {
        return result.length === limit;
    }

    private increaseOffset(options: IApiClientOpt) {
        options.qs.start = options.qs.start + options.qs.limit;
    }


}
