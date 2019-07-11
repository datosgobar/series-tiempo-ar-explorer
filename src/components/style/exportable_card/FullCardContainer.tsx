import * as React from 'react';
import { viewDatosGobAr } from '../../common/linkBuilders';


export interface IFullCardContainerProps extends React.HTMLProps<HTMLDivElement> {
    color: string,
    hasChart: string,
    hasColorBar?: boolean,
    hasFrame?: boolean,
    links: string,
    serieId: string
}


export default (props: IFullCardContainerProps) => {

    const isClickable: boolean = frameClass(props) === 'full' && props.links === 'none';
    
    const containerStyle = {
        borderTop: topBorder(props),
        cursor: ''
    };

    if(isClickable) {
        containerStyle.cursor = 'pointer';
    }

    const clickHandling = () => {
        if(isClickable) {
            const target: string = viewDatosGobAr(props.serieId);
            return window.open(target, '_blank');
        }
        return;
    };

    return(
    <div className={`card ${chartClass(props.hasChart)} ${frameClass(props)}`} 
         style={containerStyle} onClick={clickHandling}>
        {props.children}
    </div>
    )
}

function chartClass(chartMode: string): string {

    const modes = {
        'full': 'wide',
        'none': 'no-graph',
        'small': 'normal',
    }

    return modes[chartMode];

}

function frameClass(options:IFullCardContainerProps): string {

    if (options.hasFrame === undefined && (options.hasChart !== 'none' || options.links !== 'none')) {
            return 'full';
    }
    else if (options.hasFrame === true) {
        return 'full'
    }
    return 'empty';

}

function topBorder(options: IFullCardContainerProps): string {

    if(options.hasColorBar === true || (options.hasColorBar === undefined && frameClass(options) === 'full')) {
        return `5px solid ${options.color}`;
    }
    return "";

}
