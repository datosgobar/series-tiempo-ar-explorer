import * as React from "react";
import {ISerie} from "../../api/Serie";
import ShareContainer from "../style/Share/ShareContainer";
import SocialNetworkShareContainer from "../style/Share/SocialNetworkShareContainer";
import ShareDropdown from "./share/ShareDropdown";
import {TwitterShare} from "./share/TwitterShare";

export interface IShareProps {
    url: string;
    series: ISerie[]
}

export default (props: IShareProps) =>
    <ShareContainer>
        <ShareDropdown url={props.url} chartTitle={calculateChartTitle(props.series)} chartSource={calculateChartSource(props.series)} />
        <SocialNetworkShareContainer>
            <TwitterShare series={props.series} />
        </SocialNetworkShareContainer>
    </ShareContainer>


function calculateChartTitle(series: ISerie[]): string {
    return series.length > 1 ? series[0].datasetTitle : series[0].description;
}

function calculateChartSource(series: ISerie[]): string {
    return Array.from(new Set(series.map((serie: ISerie) => serie.datasetSource))).join(', ')
}
