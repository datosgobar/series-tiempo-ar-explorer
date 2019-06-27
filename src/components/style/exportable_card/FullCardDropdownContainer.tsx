import * as React from 'react';

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

    constructor(props: IFullCardDropdownContainerProps) {

        super(props);

        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);

        this.state = {
            listItems: { ...props },
            open: false,
            text: props.text            
        };
        delete this.state.listItems.text;

    }

    public componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
      }
    
    public componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    public render() {
        return (
            <div className={"btn-group" + (this.state.open ? ' open' : '')}
                 ref={node => { this.context.node = node; }}>
                <a type="button" className="btn dropdown-toggle c-linksButton" onClick={this.toggleOpen}
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.text} <span className="caret" />
                </a>
                <ul className="dropdown-menu" {...this.state.listItems} onClick={this.toggleOpen}/>
            </div>
        )
    }

    private toggleOpen() {
        const currentState = this.state.open;
        this.setState({ open: !currentState });
    };
      
    private handleOutsideClick(e: Event) {

        if (this.context.node.contains(e.target)) {
            return;
        }
        
        this.setState({ open: false });
    }

}