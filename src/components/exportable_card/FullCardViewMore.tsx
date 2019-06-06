import * as React from 'react';
import { viewDatosGobAr } from '../common/linkBuilders';


export default (props: {serieId: string}) =>
    <a href={viewDatosGobAr(props.serieId)} target="_blank" className="full-card-view-more">Ver más</a>
