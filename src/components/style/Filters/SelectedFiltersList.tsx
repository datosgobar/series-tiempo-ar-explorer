import * as React from 'react';


export default (props: any) =>
    <div className="title-and-tags">
        <h2 className="title title-md font-2">Resultados de la búsqueda:</h2>
        {props.tagList}
    </div>
