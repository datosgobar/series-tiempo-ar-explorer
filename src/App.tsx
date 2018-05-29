import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { BrowserRouter, BrowserRouterProps, HashRouter } from 'react-router-dom';
import { loadFeatured } from './actions/seriesActions';
import { ISerieApi } from './api/SerieApi';
import routes from './routes';


interface IAppProps {
    seriesApi: ISerieApi;
    featured: string[];
    dispatch: any;
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
}

class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
        this.fetchFeaturedSeries();
    }

    public fetchFeaturedSeries() {
        this.props.seriesApi.getSeries(this.props.featured).then(featuredSeries => this.props.dispatch(loadFeatured(featuredSeries)))
    }

    public render(): any {
        return (
            <div className="App">
                {this.renderRouter()}
            </div>
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

function mapStateToProps(state: any, ownProps: IAppProps) {
    return {
        seriesApi: state.seriesApi,
    };
}

export default connect(mapStateToProps)(App);
