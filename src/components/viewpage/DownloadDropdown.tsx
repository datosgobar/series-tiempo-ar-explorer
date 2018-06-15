import * as React from 'react';


export default (props: React.Props<any>) =>

    <div className="dropdown mg-lg-b pull-right">
        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">DESCARGAR <i className="far fa-angle-down" /></button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href="#">.CSV</a></li>
            <li><a href="#">.JSON</a></li>
            <li><a href="#">Excel (.XLS)</a></li>
            <li><a href="#">Imagen(.PNG)</a></li>
            <li><a href="#">PowerPoint (.PPT)</a></li>
            <li><a href="#">.PDF</a></li>
            <li><a href="#">Enlace (Link)</a></li>
        </ul>
    </div>