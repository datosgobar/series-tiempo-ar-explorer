import * as React from 'react';


export default () =>
    <a id="btn-config" className="btn btn-link mg-b pull-right mg-t" onClick={openPanel}>
        <i className="fas fa-bars" /> AGREGAR SERIES
    </a>


function openPanel() {
    const $element = document.getElementById('detalle-content')
    if ($element) {
        $element.classList.add('has-panel-open');
    }
}
