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

interface IContainerStyle {
    borderTop: string,
    cursor: string
}

export default class FullCardContainer extends React.Component<IFullCardContainerProps> {

    private isClickable: boolean;
    private containerStyle: IContainerStyle = {
        borderTop: '',
        cursor: ''
    };
    
    constructor(props: IFullCardContainerProps) {

        super(props);
        this.chartClass = this.chartClass.bind(this);
        this.frameClass = this.frameClass.bind(this);
        this.topBorder = this.topBorder.bind(this);
        this.clickHandling = this.clickHandling.bind(this);
        this.openViewMore = this.openViewMore.bind(this);

        this.isClickable = this.frameClass() === 'full' && props.links === 'none';
        this.containerStyle.borderTop = this.topBorder();
        if(this.isClickable) {
            this.containerStyle.cursor = 'pointer';
        }

    }

    public render() {
        return (
        <div className={`card ${this.chartClass()} ${this.frameClass()}`} 
             style={this.containerStyle} onClick={this.clickHandling}>
           {this.props.children}
       </div>
        )
    }

    public clickHandling() {
        if(this.isClickable) {
            const target: string = viewDatosGobAr(this.props.serieId);
            this.openViewMore(target);
        }
    }

    public openViewMore(target: string) {
        window.open(target, '_blank');
    }

    private chartClass(): string {

        const modes = {
            'full': 'wide',
            'none': 'no-graph',
            'small': 'normal',
        }
    
        return modes[this.props.hasChart];
    
    }
    
    private frameClass(): string {
    
        if (this.props.hasFrame === undefined && (this.props.hasChart !== 'none' || this.props.links !== 'none')) {
                return 'full';
        }
        else if (this.props.hasFrame === true) {
            return 'full'
        }
        return 'empty';
    
    }
    
    private topBorder(): string {
    
        if(this.props.hasColorBar === true || (this.props.hasColorBar === undefined && this.frameClass() === 'full')) {
            return `5px solid ${this.props.color}`;
        }
        return "";
    
    }

}
