import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {BrowserRouterProps} from 'react-router-dom';
import {ISerie} from "./api/Serie";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";


export interface IExplorerConfig {
    featured: ISerie[];
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
}


export function render(selector: string, config: IExplorerConfig) {

    ReactDOM.render(
        <Provider store={configureStore()}>
            <App {...config}/>
        </Provider>,
        document.getElementById(selector) as HTMLElement
    );

    registerServiceWorker();
}
