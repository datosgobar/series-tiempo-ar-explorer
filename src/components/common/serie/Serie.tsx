import * as React from 'react';

import './Serie.css';

export interface ISerie{

    id: number;
    name: string;
    author: string;
    description: string;
}

class Serie extends React.Component<ISerie, any> {

    public render () {
        return (
            <div className='Serie'>
                <h5>{this.props.name}</h5>
                <h6>{this.props.author}</h6>
                <p>{this.props.description}</p>
            </div>
        );
    }
}

export default Serie;