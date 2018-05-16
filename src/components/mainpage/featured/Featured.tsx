
import * as React from 'react';
import { connect } from 'react-redux';

import './Featured.css';

import { ISerie } from '../../../api/Serie';
import Card from '../../common/card/Card'
import Serie from '../../common/serie/Serie'

interface IFeaturedProps {
    featured: ISerie[]
}

export class Featured extends React.Component<IFeaturedProps, any> {

    public render() {
        return (
            <div className="Featured">
                <h3>Series Destacadas:</h3>
                {this.props.featured.map(
                    (serie, index) =>
                        <Card key={index} about={
                            <Serie key={index} serie={serie} />
                        }
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