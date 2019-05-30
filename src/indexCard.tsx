import * as React from "react";
import * as ReactDOM from "react-dom";
import CardExportable from "./components/exportable/CardExportable";


export function render(selector: string, config: any) {
    ReactDOM.render(
        <CardExportable />,
        document.getElementById(selector) as HTMLElement
    )
}
