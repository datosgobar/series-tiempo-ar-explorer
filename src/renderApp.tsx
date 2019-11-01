import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouterProps} from 'react-router-dom';
import SerieApi, { ISerieApi } from "./api/SerieApi";
import App from "./App";
import {ILapsProps} from "./components/mainpage/featured/Featured";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";
import { DEFAULT_DECIMALS_BILLION, DEFAULT_DECIMALS_MILLION } from "./helpers/common/LocaleValueFormatter";


export interface IExplorerConfig {
    featured: string[];
    seriesApiUri: string;
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
    catalogId?: string;
    formatChartUnits: boolean;
    laps: ILapsProps;
    locale: string;
    maxDecimals?: number;
    heroImageUrl?: string;
    numbersAbbreviate?: boolean;
    decimalsBillion?: number;
    decimalsMillion?: number;
}


export function render(selector: string, config: IExplorerConfig) {

    const decimalsBillion: number = config.decimalsBillion !== undefined && config.decimalsBillion >= 0 ? config.decimalsBillion : DEFAULT_DECIMALS_BILLION;
    const decimalsMillion: number = config.decimalsMillion !== undefined && config.decimalsMillion >= 0 ? config.decimalsMillion : DEFAULT_DECIMALS_MILLION;

    ReactDOM.render(
        <Provider store={ configureStore() } >
            <App useBrowserRouter={config.useBrowserRouter}
                 browserRouterConf={config.browserRouterConf}
                 seriesApi={ getSeriesApi(config) }
                 featuredIds={ getFeatured(config) }
                 formatChartUnits={ config.formatChartUnits }
                 laps={config.laps}
                 locale={config.locale}
                 maxDecimals={config.maxDecimals}
                 heroImageUrl={config.heroImageUrl}
                 numbersAbbreviate={config.numbersAbbreviate !== undefined ? config.numbersAbbreviate : true}
                 decimalsBillion={decimalsBillion}
                 decimalsMillion={decimalsMillion} />
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
