import * as React from 'react';

import { connect } from 'react-redux';
import { BrowserRouter, BrowserRouterProps, HashRouter } from 'react-router-dom';
import { loadFeatured, setSeriesApi } from './actions/seriesActions';
import QueryParams from "./api/QueryParams";
import { ISerieApi } from './api/SerieApi';
import Wrapper from './components/style/Common/Wrapper';
import routes from './routes';

interface IAppProps {
    featured: string[];
    dispatch?: any;
    seriesApi: ISerieApi;
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
}

class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
        this.props.dispatch(setSeriesApi(this.props.seriesApi));
    }

    public componentDidMount() {
        this.fetchFeaturedSeries();
    }

    public fetchFeaturedSeries() {
        const params = new QueryParams(this.props.featured);
        this.props.seriesApi.fetchSeries(params).then(featuredSeries => this.props.dispatch(loadFeatured(featuredSeries)))
    }

    public render(): any {
        return (
            <Wrapper>
                {this.renderRouter()}
            </Wrapper>
        );
    }

    public renderRouter() {
        const { useBrowserRouter, browserRouterConf } = this.props;
        let router;
        let props;
        if (useBrowserRouter) {
            router = BrowserRouter;
            props = browserRouterConf;
        } else {
            router = HashRouter;
            props = {};
        }
        return React.createElement(router, props, routes)
    }
}

export default connect()(App);
