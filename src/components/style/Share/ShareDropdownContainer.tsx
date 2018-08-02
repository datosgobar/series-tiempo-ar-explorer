import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';

interface IShareDropdownContainerProps extends React.Props<any>{
    text: string;
}

export default (props: IShareDropdownContainerProps) => {
    const copyMessage = () => "¡Copiado!";
    const text = props.text;
    const propsAux = {...props};
    delete propsAux.text;

    return (
        <div className="dropdown">
            <a href="#" className="btn btn-gray dropdown-toggle" data-toggle="dropdown">
                <i className="fas fa-link fa-lg"/> {text}
            </a>
            <ul className="dropdown-menu" {...propsAux} />

            <ReactTooltip effect="solid" getContent={copyMessage} place="right" globalEventOff='click' />
        </div>
    )
}