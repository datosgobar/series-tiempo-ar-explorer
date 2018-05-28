
// tslint:disable-next-line:no-var-requires
const rp = require('request-promise-native');

export default class ApiClient {

    public uri: string;
    public rp = rp;

    constructor(uri:string){

        uri += !uri.endsWith('/')? '/' : '';
        
        this.uri = uri;
    }

    public get(options: object = {}): Promise<object> {
        return this.request({method:'GET', ...options});
    }

    public request(options: object){
        return this.rp({uri: this.uri, json: true, ...options});
    }

    public endpoint(endpointPath: string): string {

        endpointPath = endpointPath.startsWith('/')? endpointPath.slice(1) : endpointPath;
        endpointPath = !endpointPath.endsWith('/')? endpointPath + '/': endpointPath;

        return this.uri + endpointPath
    }
}
