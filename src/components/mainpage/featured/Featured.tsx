import * as React from 'react';

import { ISerie } from '../../../api/Serie';

import LoadingSpinner from "../../common/LoadingSpinner";
import FeaturedSerieCard from '../../style/Card/Serie/FeaturedSerieCard';
import Row from '../../style/Common/Row';
import FeaturedContainer from '../../style/Featured/FeaturedContainer';
import FeaturedTitle from '../../style/Featured/FeaturedTitle';


interface IFeaturedProps {
    featured: ISerie[];
    featuredLoaded: boolean;
}

class Featured extends React.Component<IFeaturedProps, any> {

    public render() {
        return (
            <FeaturedContainer>
                <FeaturedTitle>Series Destacadas:</FeaturedTitle>

                {(!this.props.featuredLoaded) ? <LoadingSpinner /> : null }

                <Row>
                    {this.props.featured.map((serie: ISerie) => <FeaturedSerieCard key={serie.id} serie={serie} />)}
                </Row>
            </FeaturedContainer>
        );
    }
}

export default Featured;