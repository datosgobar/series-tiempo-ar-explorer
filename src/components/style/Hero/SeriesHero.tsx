import * as React from 'react';

import Row from '../Common/Row';
import Hero from './Hero';
import PLarge from './PLarge';
import PLarger from './PLarger';
import TitleXLG from './TitleXLG';
import TitleXXL from './TitleXXL';


const TITLE = "Series de tiempo"
const PARAGRAPH = "Desde aquí podés buscar las series de tiempo del tema que necesites, podés seleccionar más de una opcion de los resultados para compararlos."

interface ISeriesHeroProps extends React.Props<any> {
    compact?: boolean;
    searchBox: JSX.Element;
}

export default (props: ISeriesHeroProps) => {

    if (props.compact) {
        return (
            <Hero>
                <Row>
                    <div className="col-sm-8 col-md-7">
                        <TitleXLG>{TITLE}</TitleXLG>
                    </div>
                </Row>
                <Row>
                    <div className="col-sm-8 col-md-7">
                        <PLarge>{PARAGRAPH}</PLarge>
                    </div>
                    <div className="col-sm-4 col-md-5">
                        {props.searchBox}
                    </div>
                </Row>
            </Hero>
        );
    }

    return (
        <Hero>
            <Row>
                <div className="col-sm-11 col-md-9">
                    <TitleXXL>{TITLE}</TitleXXL>
                    <PLarger>{PARAGRAPH}</PLarger>
                </div>
            </Row>
            <Row>
                <div className="col-sm-9 col-md-7">
                    {props.searchBox}
                </div>
            </Row>
        </Hero>
    );
}