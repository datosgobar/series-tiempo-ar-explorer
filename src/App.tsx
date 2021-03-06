import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, BrowserRouterProps, HashRouter } from 'react-router-dom';
import { setDecimalsBillion, setDecimalsMillion, setNumbersAbbreviate } from './actions/abbreviationActions';
import { setHeroImageUrl } from './actions/heroActions';
import { loadFeaturedIds, setFormatChartUnits, setLaps, setLocale, setMaxDecimals, setSeriesApi } from './actions/seriesActions';
import { ISerieApi } from './api/SerieApi';
import { ILapsProps } from "./components/mainpage/featured/Featured";
import Wrapper from './components/style/Common/Wrapper';
import { getMaxDecimalsAmount } from './helpers/common/decimalsAmountHandling';
import routes from './routes';
import { IAbbreviationProps, buildAbbreviationProps } from './helpers/common/numberAbbreviation';


interface IAppProps {
    featuredIds: string[];
    dispatch?: any;
    seriesApi: ISerieApi;
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
    formatChartUnits?: boolean;
    laps: ILapsProps;
    locale?: string;
    maxDecimals?: number;
    heroImageUrl?: string;
    numbersAbbreviate?: boolean;
    decimalsBillion?: number;
    decimalsMillion?: number;
}

class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
        this.props.dispatch(setSeriesApi(this.props.seriesApi));
        this.props.dispatch(setFormatChartUnits(this.props.formatChartUnits || false));
        this.props.dispatch(loadFeaturedIds(this.props.featuredIds));
        this.props.dispatch(setLaps(this.props.laps));
        this.props.dispatch(setLocale(this.props.locale || "AR"));
        const maxDecimals = getMaxDecimalsAmount(this.props.maxDecimals);
        this.props.dispatch(setMaxDecimals(maxDecimals));
        this.props.dispatch(setHeroImageUrl(this.props.heroImageUrl || ''));
        const abbreviationProps: IAbbreviationProps = buildAbbreviationProps(this.props.numbersAbbreviate,
                                                                             this.props.decimalsBillion, 
                                                                             this.props.decimalsMillion);
        this.props.dispatch(setNumbersAbbreviate(abbreviationProps.numbersAbbreviate));
        this.props.dispatch(setDecimalsBillion(abbreviationProps.decimalsBillion));
        this.props.dispatch(setDecimalsMillion(abbreviationProps.decimalsMillion));
    }

    public render(): any {
        return (
            <Wrapper>{this.renderRouter()}</Wrapper>
        );
    }

    public renderRouter() {
        const { useBrowserRouter, browserRouterConf, formatChartUnits } = this.props;
        let router;
        const props = {};
        Object.assign(props, {formatChartUnits});

        if (useBrowserRouter) {
            router = BrowserRouter;
            Object.assign(props, browserRouterConf);
        } else {
            router = HashRouter;
        }
        return React.createElement(router, props, routes)
    }
}

export default connect()(App);
