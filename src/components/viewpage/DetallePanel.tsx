import * as React from 'react';


interface IDetallePanelProps extends React.Props<{}>{
    seriesPicker: JSX.Element;
}

export default class DetallePanel extends React.Component<IDetallePanelProps, {}>{

    public componentDidMount() {
        $(window).resize(() => {
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
        });
    }

    public render() {
        return (
            <div id="detalle-panel" style={{ height: "1232px" }}>
                <div className="dp-header">
                    <h3 className="title-xsm font-1">PERSONALIZAR Y AGREGAR SERIES</h3>
                    <a className="dp-header-close">
                        <i className="far fa-times" />
                    </a>
                </div>
                <div className="dp-body">

                    <ul className="nav nav-tabs nav-justified">
                        <li className="active"><a href="#tab1" data-toggle="tab">Agregar Serie</a></li>
                        {/* <li><a href="#tab2" data-toggle="tab">Editar Serie</a></li>
                        <li><a href="#tab3" data-toggle="tab">Estilos</a></li> */}
                    </ul>

                    <div className="tab-content" style={{ height: '1173px' }}>

                        <div className="tab-pane fade in active" id="tab1">
                            {this.props.seriesPicker}
                        </div>
{/*
                        <div className="tab-pane fade" id="tab2">
                            <div className="dp-filters">
                                <form>
                                    <div className="form-group">
                                        <label className="label-control mg-sm-t">De la serie:</label>
                                        <select className="form-control">
                                            <option value="">Selecciona una serie</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control mg-sm-t">Unidades:</label>
                                        <select className="form-control">
                                            <option value="">Selecciona una unidad</option>
                                            <option value="">Millones de Pesos de 1993 (unidad original)</option>
                                            <option value="">Variación período anterior</option>
                                            <option value="">Variación periodo anterior (%)</option>
                                            <option value="">Variación interanual</option>
                                            <option value="">Variación interanual (%)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control mg-sm-t">Función de agregación:</label>
                                        <select className="form-control">
                                            <option value="">Selecciona una opción</option>
                                            <option value="">Suma</option>
                                            <option value="">Promedio</option>
                                            <option value="">Mínimo</option>
                                            <option value="">Máximo</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="tab3">
                            <div className="dp-filters">
                                <form>
                                    <div className="form-group">
                                        <label className="label-control mg-sm-t">De la serie:</label>
                                        <div className="dropdown dd-series">
                                            <button type="button" className="dropdown-toggle btn full" data-toggle="dropdown">
                                                Selecciona una opción
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a href="#" className="link" style={{ color: "#045C90" }}>Exportaciones FOB por rubro</a>
                                                    <a href="#" className="btn-delete"><i className="far fa-trash-alt" /> </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="link" style={{ color: "#6CAE2F" }}>PBI General Mensual</a>
                                                    <a href="#" className="btn-delete"><i className="far fa-trash-alt" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" className="link" style={{ color: "#F4B21E" }}>Costo de vida en la Ciudad de Bs. As.</a>
                                                    <a href="#" className="btn-delete"><i className="far fa-trash-alt" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-xs-6">
                                                        <label className="label-control mg-sm-t">Color de la línea:</label>
                                                    </div>
                                                    <div className="col-xs-6">
                                                        <select className="form-control">
                                                            <option value="">&nbsp;</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-xs-6">
                                                        <label className="label-control mg-sm-t">Grosor de la línea:</label>
                                                    </div>
                                                    <div className="col-xs-6">
                                                        <select className="form-control">
                                                            <option value="">1 pt</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="label-control mg-sm-t">Tipo de línea:</label>
                                        <div className="dropdown dd-tipo-linea">
                                            <button type="button" className="dropdown-toggle btn full" data-toggle="dropdown">
                                                Selecciona una opción
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a href="#"><span className="icon icon1" /> Entera</a></li>
                                                <li><a href="#"><span className="icon icon2" /> Punteada</a></li>
                                                <li><a href="#"><span className="icon icon3" /> Guiones</a></li>
                                                <li><a href="#"><span className="icon icon4" /> Guiones y puntos</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}
