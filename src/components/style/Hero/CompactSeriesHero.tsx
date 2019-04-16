import * as React from 'react';
import Row from '../Common/Row';
import { ICompactSeriesHeroProps } from './BigSeriesHero';
import Hero from './Hero';
import PLarge from './PLarge';
import TitleXLG from './TitleXLG';


export default (props: ICompactSeriesHeroProps) =>
    <Hero>
        <Row>
            <div className="col-sm-8 col-md-7">
                <TitleXLG>{props.title}</TitleXLG>
            </div>
        </Row>
        <Row>
            <div className="col-sm-8 col-md-7">
                <PLarge>{props.paragraph}</PLarge>
            </div>
            <div className="col-sm-4 col-md-5">
                {props.searchBox}
            </div>
        </Row>
    </Hero>
