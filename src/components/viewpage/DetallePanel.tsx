import * as React from 'react';


interface IDetallePanelProps extends React.Props<{}> {
    seriesPicker: JSX.Element;
}

export default class DetallePanel extends React.Component<IDetallePanelProps, {}>{

    public render() {
        return (
            <div id="detalle-panel">
                <div className="dp-header">
                    <h3 className="title-xsm font-1">AGREGAR SERIES</h3>
                    <button className="btn btn-link dp-header-close">
                        <i className="fas fa-times" />
                    </button>
                </div>
                <div className="dp-body">
                    <ul className="nav nav-tabs nav-justified">
                        <li className="active"><a href="#tab1" data-toggle="tab">Agregar Serie</a></li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane fade in active" id="tab1">
                            {this.props.seriesPicker}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
