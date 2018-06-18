import * as React from 'react';

import Row from '../../style/Common/Row';
import Details from './Details';
import DetailsTitle from './DetailsTitle';
import DetailsTitleAndActions from './DetailsTitleAndActions';

import { ISerie } from '../../../api/Serie';


interface ISerieDetailsProp extends React.Props<any> {
    serie: ISerie;
    actions?: JSX.Element[];
}


export default (props: ISerieDetailsProp) =>

    <Details key={props.serie.id}>
        <DetailsTitleAndActions>
            <DetailsTitle pegColor={randomColor()}>
                {props.serie.title}
            </DetailsTitle>
            {props.actions}
        </DetailsTitleAndActions>
        <Row>
            <div className="col-sm-10 col-md-8">
                <dl className="dl-horizontal">
                    <dt>Temas</dt>
                    <dd>Economía</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Frecuencia de actualización</dt>
                    <dd>Semanal</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Responsable</dt>
                    <dd>{props.serie.publisher.name}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Fecha de publicación</dt>
                    <dd>11/11/2017</dd>
                </dl>
                 <dl className="dl-horizontal">
                     <dt>Fecha de actualización</dt>
                     <dd>11/11/2017</dd>
                 </dl>
                 <dl className="dl-horizontal">
                     <dt>Página de referencia</dt>
                     <dd><a href="http://www.hacienda.gob.ar" className="color-1">www.hacienda.gob.ar</a></dd>
                 </dl>
             </div>
         </Row>
     </Details>

 function randomColor() {
     // tslint:disable-next-line:no-bitwise
     return "#"+((1<<24)*Math.random()|0).toString(16)
 }
