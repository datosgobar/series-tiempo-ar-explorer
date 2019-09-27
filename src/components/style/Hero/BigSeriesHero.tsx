import * as React from 'react';
import Row from '../Common/Row';
import Hero from './Hero';
import PLarger from './PLarger';
import TitleXXL from './TitleXXL';
import { IFinalSeriesHeroProps } from './SeriesHero';


export default (props: IFinalSeriesHeroProps) =>
    <Hero heroImageUrl={props.heroImageUrl}>
        <Row>
            <div className="col-sm-11 col-md-9">
                <TitleXXL>{props.title}</TitleXXL>
                <PLarger>{props.paragraph}</PLarger>
            </div>
        </Row>
        <Row>
            <div className="col-sm-9 col-md-7">
                {props.searchBox}
            </div>
        </Row>
    </Hero>
