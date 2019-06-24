import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';

interface IShareDropdownContainerProps extends React.Props<any>{
    text: string;
}

export default (props: IShareDropdownContainerProps) => {
    const text = props.text;
    const propsAux = {...props};
    delete propsAux.text;

    return (
        <div className="dropdown">
            <a className="btn btn-gray dropdown-toggle" data-toggle="dropdown">
                {text} <i className="fas fa-angle-up"/> 
            </a>
            <ul className="dropdown-menu" {...propsAux} />

            <ReactTooltip effect="solid" getContent={tooltipContent} place="right" globalEventOff="click" />
        </div>
    )
}

function tooltipContent() {
    return "Click para copiar";
}