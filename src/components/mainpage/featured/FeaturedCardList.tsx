import * as React from 'react';
import {ISerie} from "../../../api/Serie";
import FeaturedSerieCard from "../../style/Card/Serie/FeaturedSerieCard";
import Row from "../../style/Common/Row";


interface IFeaturedCardListProps {
    seriesOrder: string[];
    series: ISerie[];
    maxDecimals: number;
    numbersAbbreviate: boolean;
    decimalsBillion: number;
    decimalsMillion: number;
    locale: string;
}

export default(props: IFeaturedCardListProps) =>
    <Row>
        {props.seriesOrder.map((id: string) => {
            const serie = props.series.find((s: ISerie) => s.id === id);

            return serie ? <FeaturedSerieCard key={serie.id} 
                                              serie={serie} 
                                              maxDecimals={props.maxDecimals} 
                                              numbersAbbreviate={props.numbersAbbreviate}
                                              decimalsBillion={props.decimalsBillion}
                                              decimalsMillion={props.decimalsMillion}
                                              locale={props.locale}  /> : null
        })}
    </Row>
