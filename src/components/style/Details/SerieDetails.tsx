import * as React from 'react';

import Row from '../../style/Common/Row';
import {Color} from '../Colors/Color';
import Details from './Details';
import DetailsTitle from './DetailsTitle';
import DetailsTitleAndActions from './DetailsTitleAndActions';

import {ISerie} from '../../../api/Serie';


interface ISerieDetailsProp extends React.Props<any> {
    serie: ISerie;
    actions?: JSX.Element[];
    pegColorFor?: (serieId: string) => Color;
}


export default (props: ISerieDetailsProp) =>

    <Details key={props.serie.id}>
        <DetailsTitleAndActions pegColor={props.pegColorFor && props.pegColorFor(props.serie.id)}>
            <DetailsTitle>
                {props.serie.description} ({props.serie.id})
            </DetailsTitle>
            {props.actions}
        </DetailsTitleAndActions>
        <Row>
            <div className="col-md-12">
                <dl className="dl-horizontal">
                    <dt>Temas</dt>
                    <dd>{props.serie.themes.map((theme) => theme.label).join(', ')}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Frecuencia de actualización</dt>
                    <dd>{props.serie.accrualPeriodicity}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Unidades</dt>
                    <dd>{props.serie.representationModeUnits}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Dataset</dt>
                    <dd>{props.serie.datasetTitle}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Distribución</dt>
                    <dd>{props.serie.distributionTitle}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Responsable de publicación</dt>
                    <dd>{props.serie.publisher.name}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Fecha de publicación</dt>
                    <dd>{props.serie.issued}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Fecha de actualización</dt>
                    <dd>{props.serie.modified || "-"}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Fuente primaria</dt>
                    <dd>{props.serie.datasetSource}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Cobertura temporal</dt>
                    <dd>{`${props.serie.startDate} a ${props.serie.endDate}`} ({props.serie.timeIndexSize} valores)</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Página de referencia</dt>
                    <dd><a href={props.serie.landingPage} className="color-1">{props.serie.landingPage}</a></dd>
                </dl>
            </div>
        </Row>
    </Details>
