import * as React from 'react';
import QueryParams from "../../../api/QueryParams";
import {ISerieApi} from "../../../api/SerieApi";
import FeaturedContainer from '../../style/Featured/FeaturedContainer';
import FeaturedTitle from '../../style/Featured/FeaturedTitle';
import FeaturedCardList from "./FeaturedCardList";


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
                <FeaturedCardList seriesOrder={this.props.featured} series={this.state.featuredSeries} />
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
