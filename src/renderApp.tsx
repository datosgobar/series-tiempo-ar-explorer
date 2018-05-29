import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {BrowserRouterProps} from 'react-router-dom';
import {ISerie} from "./api/Serie";
import SerieApi, { ISerieApi } from "./api/SerieApi";
import App from "./App";

import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";


export interface IExplorerConfig {
    featured: ISerie[];
    seriesApiUri: string;
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
}


export function render(selector: string, config: IExplorerConfig) {

    ReactDOM.render(
        <Provider store={ configureStore() } >
            <App seriesApi={ getSeriesApi(config) } featured={ getFeatured(config) } />
        </Provider>,
        document.getElementById(selector) as HTMLElement
    );

    registerServiceWorker();
}


export function getFeatured(config: IExplorerConfig) {

    return config.featured;
}


function getSeriesApi(config: IExplorerConfig): ISerieApi {

    const uri: string = config.seriesApiUri;

    if(!uri){
        throw new ImproperlyConfiguredException("seriesApiUri is not set");
    }

    return SerieApi.withUri(uri);
}

class ImproperlyConfiguredException extends Error {}
