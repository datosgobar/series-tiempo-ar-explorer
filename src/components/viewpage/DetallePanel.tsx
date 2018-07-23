import * as React from 'react';


interface IDetallePanelProps extends React.Props<{}> {
    seriesPicker: JSX.Element;
}

export default class DetallePanel extends React.Component<IDetallePanelProps, {}>{

    public componentDidMount() {
        $(window).resize(detallePanelResizer);
    }

    public componentWillUnmount() {
        $(window).off("resize", detallePanelResizer);
    }

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

function detallePanelResizer() {
    const wHeight = $(window).height();
    const dcHeight = $('#detalle-content').height();
    const dpHeight = $('#detalle-panel .dp-header').height();
    const tabsHeight = $('#detalle-panel .dp-body .nav-tabs').height();

    if (wHeight === undefined
        || dcHeight === undefined
        || dpHeight === undefined
        || tabsHeight === undefined) {
        return;
    }

    const dchdHeight = dpHeight + tabsHeight;

    if (wHeight >= dcHeight) {
        $('#detalle-panel').height(wHeight);
        $('#detalle-panel .tab-content').height(wHeight - dchdHeight);
    } else {
        $('#detalle-panel').height(dcHeight);
        $('#detalle-panel .tab-content').height(dcHeight - dchdHeight);
    }
}