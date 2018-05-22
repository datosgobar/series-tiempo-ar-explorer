import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";

import { ISerie } from "./api/Serie";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";


export interface IExplorerConfig {
    featured: ISerie[];
}


export function render(selector: string, config: IExplorerConfig) {

    ReactDOM.render(
        <Provider store={ configureStore() } >
            <App featured={ getFeatured(config) } />
        </Provider>,
        document.getElementById(selector) as HTMLElement
    );

    registerServiceWorker();
}


export function getFeatured(config: IExplorerConfig) {

    return config.featured;
}
