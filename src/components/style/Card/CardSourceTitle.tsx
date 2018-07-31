import * as React from 'react';
import CardSubtitle from "./CardSubtitle";


interface ICardSourceTitleProps extends React.HTMLProps<HTMLDivElement> {
    source: string;
}

export default (props: ICardSourceTitleProps) => {
    return (<CardSubtitle>{sourceText(props.source)}</CardSubtitle>);
}

function sourceText(source: string) {
    return source !== '' && source !== undefined ? `Fuente: ${source}` : '';
}