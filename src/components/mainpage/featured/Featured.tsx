import * as React from 'react';

import { ISerie } from '../../../api/Serie';

import SerieCard from '../../style/Card/SerieCard';
import Row from '../../style/Common/Row';
import FeaturedContainer from '../../style/Featured/FeaturedContainer';
import FeaturedTitle from '../../style/Featured/FeaturedTitle';


interface IFeaturedProps {
    featured: ISerie[]
}

class Featured extends React.Component<IFeaturedProps, any> {

    public render() {
        return (
            <FeaturedContainer>
                <FeaturedTitle>Series Destacadas:</FeaturedTitle>
                <Row>
                    {this.props.featured.map(
                        (serie: ISerie) =>
                                <SerieCard key={serie.id} serie={serie} />
                            )}
                </Row>
            </FeaturedContainer>
        );
    }
}

export default Featured;