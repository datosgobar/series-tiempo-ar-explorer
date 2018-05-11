import * as React from 'react';

import './Card.css';

interface ICardState{

    about: React.Component[]
}

class Card extends React.Component<any, ICardState> {

    constructor(props: any){
        super(props);

        this.state = {about: this.props.about};
    }

    public render () {
        return (
            <div className='Card'>
                {this.state.about}
            </div>
        );
    }
}

export default Card;