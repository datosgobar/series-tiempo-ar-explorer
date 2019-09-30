import * as React from 'react';
import Row from '../Common/Row';
import Hero from './Hero';
import PLarger from './PLarger';
import TitleXXL from './TitleXXL';
import { IFinalSeriesHeroProps } from './SeriesHero';


export default (props: IFinalSeriesHeroProps) =>
    <Hero heroImageUrl={props.heroImageUrl}>
        <Row>
            <div className="col-sm-12 col-md-10">
                <TitleXXL>{props.title}</TitleXXL>
                <PLarger>{props.paragraph}</PLarger>
            </div>
        </Row>
        <Row>
            <div className="col-sm-12 col-md-10">
                {props.searchBox}
            </div>
        </Row>
    </Hero>
