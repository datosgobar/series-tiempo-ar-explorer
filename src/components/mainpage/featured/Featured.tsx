import * as React from 'react';
import QueryParams from "../../../api/QueryParams";
import {ISerie} from '../../../api/Serie';
import {ISerieApi} from "../../../api/SerieApi";
import FeaturedSerieCard from '../../style/Card/Serie/FeaturedSerieCard';
import Row from '../../style/Common/Row';
import FeaturedContainer from '../../style/Featured/FeaturedContainer';
import FeaturedTitle from '../../style/Featured/FeaturedTitle';


interface IFeaturedProps {
    featured: string[];
    seriesApi: ISerieApi;
}


export default class Featured extends React.Component<IFeaturedProps, any> {

    public constructor(props: IFeaturedProps) {
        super(props);

        this.state = {
            featuredSeries: []
        }
    }

    public componentWillMount() {
        this.fetchFeaturedSeries();
    }

    public render() {
        return (
            <FeaturedContainer>
                <FeaturedTitle>Series Destacadas:</FeaturedTitle>

                <Row>
                    {this.props.featured.map((id: string) => {
                        const serie = this.state.featuredSeries.find((s: ISerie) => s.id === id);

                        return serie ? <FeaturedSerieCard key={serie.id} serie={serie} /> : null
                    })}
                </Row>
            </FeaturedContainer>
        );
    }

    private fetchFeaturedSeries() {
        this.props.featured.forEach((id: string) => {
            this.props.seriesApi.fetchSeries(new QueryParams([id])).then(featuredSeries => {
                this.setState({featuredSeries: Array.from(this.state.featuredSeries).concat(featuredSeries)});
            })
        });
    }

}
