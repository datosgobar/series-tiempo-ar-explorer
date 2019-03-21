import * as React from "react";


export interface ISelectorProps<T> {
    selected: T;
    items: T[];
    onChange: (item: T | null) => void;
    renderItem: (item: T) => JSX.Element | string;
}

export default class Selector<T> extends React.Component<ISelectorProps<T>, any> {

    constructor(props: ISelectorProps<T>) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.toRadioButton = this.toRadioButton.bind(this);
    }

    public handleClick(item: T) {
        return (event: React.SyntheticEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            event.stopPropagation();
            this.props.onChange(item);
        };
    }

    public render() {
        return (
            <ul>
                {this.props.items.map(this.toRadioButton)}
            </ul>
        );
    }

    public toRadioButton(item: T) {
        return (
            <li key={item.toString()}>
                <a onClick={this.handleClick(item)}>
                    <label>
                        {this.props.renderItem(item)}
                    </label>
                </a>
            </li>
        );
    }
}
