import * as React from 'react';


interface IDetallePanelProps extends React.Props<{}> {
    seriesPicker: JSX.Element;
}

export default class DetallePanel extends React.Component<IDetallePanelProps, {}>{

    public render() {
        return (
            <div id="detalle-panel" style={{ height: "1232px" }}>
                <div className="dp-header">
                    <h3 className="title-xsm font-1">AGREGAR SERIES</h3>
                    <a className="dp-header-close">
                        <i className="far fa-times" />
                    </a>
                </div>
                <div className="dp-body">

                    <ul className="nav nav-tabs nav-justified">
                        <li className="active"><a href="#tab1" data-toggle="tab">Agregar Serie</a></li>
                    </ul>

                    <div className="tab-content" style={{ height: '1173px' }}>

                        <div className="tab-pane fade in active" id="tab1">
                            {this.props.seriesPicker}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
