import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import { createRef } from 'react';

interface IFullCardDropdownContainerProps extends React.Props<any> {
    text: string;
}

interface IFullCardDropdownContainerState {
    open: boolean;
    text: string;
    listItems: any;
}

export default class FullCardDropdownContainer
    extends React.Component<IFullCardDropdownContainerProps, IFullCardDropdownContainerState> {
    
    private dropdownRef: React.RefObject<HTMLDivElement> = createRef();

    constructor(props: IFullCardDropdownContainerProps) {

        super(props);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.closeDropdownOnOutsideClick = this.closeDropdownOnOutsideClick.bind(this);

        this.state = {
            listItems: { ...props },
            open: false,
            text: props.text            
        };
        delete this.state.listItems.text;

    }

    public componentDidMount() {
        document.addEventListener('click', this.closeDropdownOnOutsideClick);
      }
    
    public componentWillUnmount() {
        document.removeEventListener('click', this.closeDropdownOnOutsideClick);
    }

    public render() {
        return (
            <div className={"btn-group" + (this.state.open ? ' open' : '')} onClick={this.toggleOpen} ref={this.dropdownRef}>
                <a type="button" className="btn dropdown-toggle c-linksButton" 
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.text} <span className="caret" />
                </a>
                <ul className="dropdown-menu" {...this.state.listItems}/>

                <ReactTooltip effect="solid" getContent={this.tooltipContent} place="right" globalEventOff='click' />
            </div>
        )
    }

    private toggleOpen() {
        const currentState = this.state.open;
        this.setState({ open: !currentState });
    };
      
    private closeDropdownOnOutsideClick(e: Event) {
        const target = e.target as Node;
        if (this.dropdownRef.current && this.dropdownRef.current.contains(target)) {
            return;
        }
        
        this.setState({ open: false });
    };

    private tooltipContent() {
        return "Click para copiar";
    };

}