import * as React from 'react';

import './Serie.css';

import { ISerie } from '../../../api/Serie';

interface ISerieProps {
    serie: ISerie;
}

class Serie extends React.Component<ISerieProps, any> {

    public render () {
        return (
            <div className='Serie'>
                <h5>{this.props.serie.title}</h5>
                <h6>{this.props.serie.publisher.name}</h6>
                <p>{this.props.serie.description}</p>
            </div>
        );
    }
}

export default Serie;