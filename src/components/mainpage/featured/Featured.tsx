import * as React from 'react';

import { ISerie } from '../../../api/Serie';

import FeaturedSerieCard from '../../style/Card/Serie/FeaturedSerieCard';
import Color from '../../style/Colors/Color';
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
                                <FeaturedSerieCard key={serie.id} serie={serie} pegColor={Color.Purple}/>
                            )}
                </Row>
            </FeaturedContainer>
        );
    }
}

export default Featured;