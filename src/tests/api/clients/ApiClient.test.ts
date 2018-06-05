import {default as axios} from "axios";
import {internet, lorem} from "faker";
import {install, stubRequest, uninstall, wait} from "moxios";
import {ApiClient} from "../../../api/ApiClient";

describe("ApiClient", () => {
    let axiosInstance:any;
    let apiClient: ApiClient;

    let baseURL: string;
    let path: string;
    let response: object;
    beforeEach(() => {
        // import and pass your custom axios instance to this method
        baseURL = internet.url();
        path = lorem.word();
        response = {aKey: lorem.word()};
        axiosInstance = axios.create();
        install(axiosInstance);
        apiClient = new ApiClient(baseURL, axiosInstance);
        stubRequest('/' + path + '/', {
            response,
            status: 200,
        })
    });
    afterEach(() => {
        // import and pass your custom axios instance to this method
        uninstall(axiosInstance)
    });
    it("calls get with uri", () => {
        const mockCallback = jest.fn();

        apiClient.get({uri: path, qs: {}}).then(mockCallback);
        wait( () => {
            expect(mockCallback.mock.calls[0][0].data).toBe(response);
        })

    });
});
