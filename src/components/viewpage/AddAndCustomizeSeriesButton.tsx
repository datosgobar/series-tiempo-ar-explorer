import * as React from 'react';

const BTN_CONFIG = '#btn-config';
const BTN_CLOSE = '#detalle-panel .dp-header-close';

export default class AddAndCustomizeSeriesButton extends React.Component<{}, {}>{

    public componentDidMount() {

        $(() => {
            $(BTN_CONFIG).click(openPanel);
            $(BTN_CLOSE).click(closePanel);
        });
    }

    public componentWillUnmount() {
        $(BTN_CONFIG).off('click', openPanel);
        $(BTN_CLOSE).off('click', closePanel);
    }

    public render() {
        return (
            <a id="btn-config" className="btn btn-link mg-b pull-right mg-t">
                <i className="fas fa-bars" /> AGREGAR SERIES
            </a>
        );
    }
}

function openPanel() {
    $('#detalle-content').addClass('has-panel-open');
}

function closePanel() {
    $('#detalle-content').removeClass('has-panel-open');
}