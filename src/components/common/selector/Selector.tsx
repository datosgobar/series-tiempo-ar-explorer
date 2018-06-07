import * as React from "react";


interface ISelectorProps<T> {

    selected: T;
    items: T[];
    onItemSelected: (event: React.SyntheticEvent<HTMLElement>, item: T | null) => void;
    renderItem: (item: T) => JSX.Element | string;
}


class Selector<T> extends React.Component<ISelectorProps<T>, any> {

    constructor(props: ISelectorProps<T>) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.toRadioButton = this.toRadioButton.bind(this);
    }
    
    public handleClick(item: T) {
        return (event: React.SyntheticEvent<HTMLInputElement>) => {
            this.props.onItemSelected(
                event, 
                (event.target as any).checked? item : null
            );
        };
    }

    public render() {
        return (
            <div className="Selector">
                {this.props.items.map(this.toRadioButton)}
            </div>
        );
    }

    public toRadioButton(item: T) {
        return (
            <div className="Item" key={item.toString()}>
                <label>
                    <input type="checkbox" checked={this.props.selected === item} onChange={this.handleClick(item)} />
                    {this.props.renderItem(item)}
                </label>
            </div>);
    }
}

export default Selector;