import * as React from 'react';
import { ISerie } from '../../../api/Serie';
import Row from '../../style/Common/Row';
import { Color, getColorBySerieId } from '../Colors/Color';
import Details from './Details';
import DetailsTitle from './DetailsTitle';
import DetailsTitleAndActions from './DetailsTitleAndActions';


interface ISerieDetailsProp extends React.Props<any> {
    serie: ISerie;
    actions?: JSX.Element[];
    pegColorFor?: (serieId: string) => Color;
    series: ISerie[];
}


export default (props: ISerieDetailsProp) =>

    <Details key={props.serie.id}>
        <DetailsTitleAndActions>
            <DetailsTitle style={{borderLeftColor: getColorBySerieId(props.series, props.serie.id)}}>
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
                    <dd>{serieUnits(props.serie)}</dd>
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
                    <dt>Distribución original</dt>
                    <dd><a href={props.serie.downloadURL} className="color-1">{props.serie.downloadURL}</a></dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Página de referencia</dt>
                    <dd><a href={props.serie.landingPage} className="color-1" target="_blank">{props.serie.landingPage}</a></dd>
                </dl>
            </div>
        </Row>
    </Details>


function serieUnits(serie: ISerie): string {
    const units = serie.units || 'No especificado';
    return serie.representationModeUnits === serie.units ? serie.representationModeUnits : `${serie.representationModeUnits} (Original: ${units})`
}
