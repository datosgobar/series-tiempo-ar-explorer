
// tslint:disable-next-line:no-var-requires
const rp = require('request-promise-native');

export default class ApiClient {

    public uri: string;
    public rp = rp;

    constructor(uri:string){
        this.uri = uri;
    }

    public get(options: object = {}): Promise<object> {
        return this.request({method:'GET', ...options});
    }

    public request(options: object){
        return this.rp({uri: this.uri, json: true, ...options});
    }
}
