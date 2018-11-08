import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {BrowserRouterProps} from 'react-router-dom';
import SerieApi, { ISerieApi } from "./api/SerieApi";
import App from "./App";

import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";


export interface IExplorerConfig {
    featured: string[];
    seriesApiUri: string;
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
    catalogId?: string;
    formatChartUnits: boolean
}


export function render(selector: string, config: IExplorerConfig) {
    ReactDOM.render(
        <Provider store={ configureStore() } >
            <App useBrowserRouter={config.useBrowserRouter}
                 browserRouterConf={config.browserRouterConf}
                 seriesApi={ getSeriesApi(config) }
                 featuredIds={ getFeatured(config) }
                 formatChartUnits={ config.formatChartUnits } />
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

    if (!uri) { throw new ImproperlyConfiguredException("seriesApiUri is not set"); }

    return  SerieApi.withUri(uri).withCatalogID(config.catalogId);
}

class ImproperlyConfiguredException extends Error {}
