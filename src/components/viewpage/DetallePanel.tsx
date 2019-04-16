import * as React from 'react';


interface IDetallePanelProps extends React.Props<{}> {
    seriesPicker: JSX.Element;
}

export default (props: IDetallePanelProps) =>
    <div id="detalle-panel">
        <div className="dp-header">
            <h3 className="title-xsm font-1">AGREGAR SERIES</h3>
            <button className="btn btn-link dp-header-close" onClick={closePanel}>
                <i className="fas fa-times" />
            </button>
        </div>
        <div className="dp-body">
            <ul className="nav nav-tabs nav-justified">
                <li className="active"><a href="#tab1" data-toggle="tab">Agregar Serie</a></li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane fade in active" id="tab1">
                    {props.seriesPicker}
                </div>
            </div>
        </div>
    </div>


function closePanel() {
    const $element = document.getElementById('detalle-content')
    if ($element) {
        $element.classList.remove('has-panel-open');
    }
}
