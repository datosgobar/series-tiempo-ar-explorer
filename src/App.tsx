import * as React from 'react';

import {connect} from 'react-redux';
import {BrowserRouter, BrowserRouterProps, HashRouter} from 'react-router-dom';
import {loadFeatured, setFormatChartUnits, setSeriesApi} from './actions/seriesActions';
import QueryParams from "./api/QueryParams";
import {ISerieApi} from './api/SerieApi';
import LoadingSpinner from "./components/common/LoadingSpinner";
import Wrapper from './components/style/Common/Wrapper';
import routes from './routes';

interface IAppProps {
    featured: string[];
    dispatch?: any;
    seriesApi: ISerieApi;
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
    formatChartUnits?: boolean;
}

class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
        this.props.dispatch(setSeriesApi(this.props.seriesApi));
        this.props.dispatch(setFormatChartUnits(this.props.formatChartUnits || false));

        this.state = {
            loading: true
        };
    }

    public componentDidMount() {
        this.fetchFeaturedSeries();
    }

    public fetchFeaturedSeries() {
        const params = new QueryParams(this.props.featured);
        this.props.seriesApi.fetchSeries(params).then(featuredSeries => {
            this.props.dispatch(loadFeatured(featuredSeries));
            this.setState({loading: false});
        })
    }

    public render(): any {
        if(this.state.loading) { return <div className="app-loading"><LoadingSpinner /></div> }

        return (
            <Wrapper>
                {this.renderRouter()}
            </Wrapper>
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
