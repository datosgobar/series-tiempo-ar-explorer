import * as React from 'react';


export default (props: {serieId: string}) =>
    <a href={viewDatosGobAr(props.serieId)} target="_blank" className="full-card-view-more">Ver más</a>


function viewDatosGobAr(serieId: string): string {
    return `https://datos.gob.ar/series/api/series/?ids=${serieId}`
}
