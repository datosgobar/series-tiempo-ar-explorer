import * as React from 'react';
import { IDateRange } from "../../../api/DateSerie";
import { ISerie } from "../../../api/Serie";
import { Color } from "../../style/Colors/Color";
import GraphContainer from "../../style/Graphic/GraphContainer";
import { Share } from "../Share";
import GraphicWithDate from "./GraphicWithDate";

export interface IGraphicWithDateProps {
    series: ISerie[];
    colorFor: (serie: ISerie) => Color;
    date: IDateRange;
    handleChangeDate: ({}) => void;
    handleChangeFrequency: (value: string) => void;
}

export interface IGraphicAndShareProps extends IGraphicWithDateProps{
    url: string;
}

export default (props: IGraphicAndShareProps) =>
    <GraphContainer>
        <GraphicWithDate series={props.series}
                         colorFor={props.colorFor}
                         date={props.date}
                         handleChangeDate={props.handleChangeDate}
                         handleChangeFrequency={props.handleChangeFrequency} />
        <Share url={props.url} series={props.series} />
    </GraphContainer>
