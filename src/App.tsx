import * as React from 'react';

import { connect } from 'react-redux';
import { BrowserRouter, BrowserRouterProps, HashRouter } from 'react-router-dom';
import { loadFeatured, setSeriesApi } from './actions/seriesActions';
import { ISerieApi } from './api/SerieApi';
import routes from './routes';

import Wrapper from './components/style/Common/Wrapper';

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
        this.props.seriesApi.fetchSeries(this.props.featured).then(featuredSeries => this.props.dispatch(loadFeatured(featuredSeries)))
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
