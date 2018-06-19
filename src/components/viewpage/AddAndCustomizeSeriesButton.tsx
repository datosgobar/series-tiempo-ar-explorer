import * as React from 'react';


export default class AddAndCustomizeSeriesButton extends React.Component<{}, {}>{

    public componentDidMount() {

        $(() => {

            $('#btn-config').click(() => {
                $('#detalle-content').addClass('has-panel-open');
                return false;
            });

            $('#detalle-panel .dp-header-close').click(() => {
                $('#detalle-content').removeClass('has-panel-open');
                return false;
            });

        });
    }
    public render() {
        return (
            <a id="btn-config" className="btn btn-link mg-b pull-right mg-t">
                <i className="fas fa-bars" /> PERSONALIZAR Y AGREGAR SERIES
            </a>
        );
    }
}