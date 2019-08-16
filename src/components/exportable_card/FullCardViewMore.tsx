import * as React from 'react';
import { viewDatosGobAr } from '../common/linkBuilders';


export default (props: {serieId: string, collapse?: string}) =>
    <a href={viewDatosGobAr(props.serieId, props.collapse)} target="_blank">Ver más</a>
