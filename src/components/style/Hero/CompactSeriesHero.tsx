import * as React from 'react';
import Row from '../Common/Row';
import Hero from './Hero';
import PLarge from './PLarge';
import TitleXLG from './TitleXLG';
import { IFinalSeriesHeroProps } from './SeriesHero';


export default (props: IFinalSeriesHeroProps) =>
    <Hero heroImageUrl={props.heroImageUrl}>
        <Row>
            <div className="col-sm-8 col-md-7">
                <TitleXLG>{props.title}</TitleXLG>
            </div>
        </Row>
        <Row>
            <div className="col-sm-12 col-md-10 col-lg-7">
                <PLarge>{props.paragraph}</PLarge>
            </div>
            <div className="col-sm-12 col-md-10 col-lg-5">
                {props.searchBox}
            </div>
        </Row>
    </Hero>
