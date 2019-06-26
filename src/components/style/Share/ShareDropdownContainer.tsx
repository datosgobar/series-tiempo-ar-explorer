import * as React from 'react';

interface IShareDropdownContainerProps extends React.Props<any> {
    text: string;
}

export default (props: IShareDropdownContainerProps) => {
    const text = props.text;
    const propsAux = { ...props };
    delete propsAux.text;

    return (
        <div className="btn-group">
            <a type="button" className="btn dropdown-toggle c-linksButton"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {text} <span className="caret"/>
            </a>
            <ul className="dropdown-menu" {...propsAux} />
        </div>
    )
}
