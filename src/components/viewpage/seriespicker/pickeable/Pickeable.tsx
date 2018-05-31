import * as React from 'react';

import './Pickeable.css';

interface IPickeableProps<T> {

    value: T
    onPick: (value: T) => void;
}

class Pickeable<T> extends React.Component<IPickeableProps<T>, any> {

    constructor(props: IPickeableProps<T>, context: any) {
        super(props, context);

        this.pick = this.pick.bind(this)
    }

    public pick(event: any) {
        event.stopPropagation();
        this.props.onPick(this.props.value);
    }

    public render() {
        return (
            <div className="Pickeable" onClick={this.pick}>
                {this.props.children}
            </div>
        );
    }
}

export default Pickeable;