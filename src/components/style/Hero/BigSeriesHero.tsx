import * as React from 'react';
import Row from '../Common/Row';
import Hero from './Hero';
import PLarger from './PLarger';
import TitleXXL from './TitleXXL';


export interface ICompactSeriesHeroProps {
    title: string;
    paragraph: string;
    searchBox: JSX.Element;
}


export default (props: ICompactSeriesHeroProps) =>
    <Hero>
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
