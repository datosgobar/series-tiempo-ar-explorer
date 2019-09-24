import * as React from 'react';
import { viewDatosGobAr } from "../../helpers/card/cardLinkBuilders";


export default (props: {serieId: string, collapse?: string}) =>
    <a href={viewDatosGobAr(props.serieId, props.collapse)} target="_blank">Ver más</a>
