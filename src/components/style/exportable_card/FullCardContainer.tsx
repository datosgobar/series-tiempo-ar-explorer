import * as React from 'react';


export interface IFullCardContainerProps extends React.HTMLProps<HTMLDivElement> {
    hasChart: string,
    hasFrame?: boolean,
    links: string
}


export default (props: IFullCardContainerProps) =>
    <div className={`card ${chartClass(props.hasChart)} ${borderClass(props)}`}>
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

function borderClass(options:IFullCardContainerProps): string {

    if (options.hasFrame === undefined && (options.hasChart !== 'none' || options.links !== 'none')) {
            return 'full';
    }
    else if (options.hasFrame === true) {
        return 'full'
    }
    return 'empty';

}
