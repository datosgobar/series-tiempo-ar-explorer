import * as React from 'react';
import {connect} from "react-redux";
import QueryParams from "../../../api/QueryParams";
import {ISerieApi} from "../../../api/SerieApi";
import {valuesFromObject} from "../../../helpers/common/commonFunctions";
import {IStore} from "../../../store/initialState";
import FeaturedContainer from '../../style/Featured/FeaturedContainer';
import FeaturedTitle from '../../style/Featured/FeaturedTitle';
import FeaturedCardList from "./FeaturedCardList";


export interface ILapsProps {
    Diaria: number;
    Mensual: number;
    Trimestral: number;
    Semestral: number;
    Anual: number;
}

interface IFeaturedProps {
    featured: string[];
    seriesApi: ISerieApi;
    laps: ILapsProps;
    maxDecimals: number;
    numbersAbbreviate: boolean;
    decimalsBillion: number;
    decimalsMillion: number;
    locale: string;
}


class Featured extends React.Component<IFeaturedProps, any> {

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
                <FeaturedCardList seriesOrder={this.props.featured}
                                  series={this.state.featuredSeries} 
                                  maxDecimals={this.props.maxDecimals} 
                                  numbersAbbreviate={this.props.numbersAbbreviate} 
                                  decimalsBillion={this.props.decimalsBillion} 
                                  decimalsMillion={this.props.decimalsMillion}
                                  locale={this.props.locale} />
            </FeaturedContainer>
        );
    }

    private fetchFeaturedSeries() {
        this.props.featured.forEach((id: string) => {
            const params = new QueryParams([id]);
            params.setLast(getBiggestLaps(this.props.laps));
            this.props.seriesApi.simpleFetchSeries(params).then(featuredSeries => {
                this.setState({featuredSeries: Array.from(this.state.featuredSeries).concat(featuredSeries)});
            })
        });
    }

}

// As we don't know the frequency at this point, we select the max laps value from the dictionary
function getBiggestLaps(lapsDic: ILapsProps): number {
    return Math.max.apply(null, valuesFromObject(lapsDic));
}


function mapStateToProps(state: IStore) {
    return {
        laps: state.laps,
    };
}


export default connect(mapStateToProps)(Featured);
