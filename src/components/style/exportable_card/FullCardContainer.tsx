import * as React from 'react';
import { ICardBaseConfig } from '../../../indexCard';


interface IFullCardContainerProps extends React.HTMLProps<HTMLDivElement> {
    cardOptions: ICardBaseConfig
}


export default (props: IFullCardContainerProps) =>
    <div className={`card ${chartClass(props.cardOptions.hasChart)} ${borderClass(props.cardOptions)}`}>
        {props.children}
    </div>


function chartClass(chartMode: string): string {
    const modes = {
        'full': 'wide',
        'none': 'no-graph',
        'small': 'normal',
    }

    return modes[chartMode];
}

function borderClass(props:ICardBaseConfig): string {
    if (props.hasChart !== 'none' || props.links !== 'none') {
        return 'full'
    } else{
        return 'empty'
    }
}
