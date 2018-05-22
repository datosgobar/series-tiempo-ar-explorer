import * as React from 'react';

import './Serie.css';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ISerie } from '../../../api/Serie';

interface ISerieProps extends RouteComponentProps<any>{
    serie: ISerie;
}

class Serie extends React.Component<ISerieProps, any> {

    constructor(props: ISerieProps, context: any){
        super(props, context);

        this.viewSerie = this.viewSerie.bind(this);
    }

    public viewSerie(event: any) {
        const uri = '/view/?id=' + this.props.serie.id;

        this.props.history.push(uri);
    }

    public render () {
        return (
            <div className='Serie' onClick={this.viewSerie}>
                <h5>{this.props.serie.title}</h5>
                <h6>{this.props.serie.publisher.name}</h6>
                <p>{this.props.serie.description}</p>
            </div>
        );
    }
}

export default withRouter(Serie);