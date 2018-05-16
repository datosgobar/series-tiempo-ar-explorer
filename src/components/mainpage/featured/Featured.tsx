
import * as React from 'react';
import { connect } from 'react-redux';

import './Featured.css';

import Card from '../../common/card/Card'
import Serie, { ISerie } from '../../common/serie/Serie'

interface IFeaturedProps {
    featured: ISerie[]
}

class Featured extends React.Component<IFeaturedProps, any> {

    public render() {
        return (
            <div className="Featured">
                <h3> Series Destacadas: </h3>
                {this.props.featured.map(
                    (serie, index) =>
                        <Card key={index} about={
                            <Serie key={serie.id}
                                id={serie.id}
                                name={serie.name}
                                author={serie.author}
                                description={serie.description}
                            />}
                        />)}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        featured: state.featured
    }
}

export default connect(mapStateToProps)(Featured);