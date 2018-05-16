import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { ISerie } from "./components/common/serie/Serie";

import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";


interface IExplorerConfig {
    featured: ISerie[];
}


export default function render(selector: string, config: IExplorerConfig) {

    ReactDOM.render(
        <Provider store={ configureStore() } >
            <App featured={ getFeatured(config) } />
        </Provider>,
        document.getElementById(selector) as HTMLElement
    );

    registerServiceWorker();
}


function getFeatured(config: IExplorerConfig) {

    return config.featured;
}
