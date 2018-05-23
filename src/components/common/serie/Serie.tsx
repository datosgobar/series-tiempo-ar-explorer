import * as React from 'react';

import './Serie.css';

import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ISerie } from '../../../api/Serie';

interface ISerieProps extends RouteComponentProps<any>{
    serie: ISerie;
}

class Serie extends React.Component<ISerieProps, any> {

    public render () {
        return (
            <Link className='Serie' to={`/view/?id=${this.props.serie.id}`}>
                <h5>{this.props.serie.title}</h5>
                <h6>{this.props.serie.publisher.name}</h6>
                <p>{this.props.serie.description}</p>
            </Link>
        );
    }
}

export default withRouter(Serie);
