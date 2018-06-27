import * as React from 'react';

import Row from '../../style/Common/Row';
import Details from './Details';
import DetailsTitle from './DetailsTitle';
import DetailsTitleAndActions from './DetailsTitleAndActions';

import { ISerie } from '../../../api/Serie';
import Color from '../Colors/Color';


interface ISerieDetailsProp extends React.Props<any> {
    serie: ISerie;
    actions?: JSX.Element[];
}


export default (props: ISerieDetailsProp) =>

    <Details key={props.serie.id}>
        <DetailsTitleAndActions>
            <DetailsTitle pegColor={Color.Orange}>
                {props.serie.title}
            </DetailsTitle>
            {props.actions}
        </DetailsTitleAndActions>
        <Row>
            <div className="col-sm-10 col-md-8">
                <dl className="dl-horizontal">
                    <dt>Temas</dt>
                    <dd>{props.serie.themes.join(', ')}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Frecuencia de actualización</dt>
                    <dd>{props.serie.accrualPeriodicity}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Responsable</dt>
                    <dd>{props.serie.publisher.name}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Fecha de publicación</dt>
                    <dd>{props.serie.issued}</dd>
                </dl>
                 <dl className="dl-horizontal">
                     <dt>Fecha de actualización</dt>
                     <dd>2018-01-01</dd>
                 </dl>
                 <dl className="dl-horizontal">
                     <dt>Página de referencia</dt>
                     <dd><a href={props.serie.landingPage} className="color-1">{props.serie.landingPage}</a></dd>
                 </dl>
             </div>
         </Row>
     </Details>
