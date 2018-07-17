import * as React from 'react';
import { IDateRange } from "../../../api/DateSerie";
import { ISerie } from "../../../api/Serie";
import { Color } from "../../style/Colors/Color";
import GraphContainer from "../../style/Graphic/GraphContainer";
import { Share } from "../Share";
import Graphic from "./Graphic";

export interface IGraphicAndShareProps {
    series: ISerie[];
    colorFor: (serie: ISerie) => Color;
    date: IDateRange;
}

export default (props: IGraphicAndShareProps) =>
    <GraphContainer>
        <Graphic series={props.series} colorFor={props.colorFor} date={props.date} />
        <Share url={window.location.href} series={props.series} />
    </GraphContainer>
