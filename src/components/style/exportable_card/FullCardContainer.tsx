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

function borderClass(options:ICardBaseConfig): string {

    if (options.hasFrame === undefined && (options.hasChart !== 'none' || options.links !== 'none')) {
            return 'full';
    }
    else if (options.hasFrame === true) {
        return 'full'
    }
    return 'empty';

}
