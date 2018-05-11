
import * as React from 'react';

import './Featured.css';

import Card from '../../common/card/Card'
import Serie from '../../common/serie/Serie'

interface IFeaturedState {
    featured: Serie[]
}

class Featured extends React.Component<any, IFeaturedState> {

    constructor(props: any){
        super(props);

        this.state = {featured: this.props.featured};
    }

    public render () {
        return (
            <div className="Featured">
                <h3> Series Destacadas: </h3>
                {this.state.featured.map((serie, index) => <Card key={index} about={serie} />)}
            </div>
        );
    }
}

export default Featured;