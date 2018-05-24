import * as React from 'react';
import './App.css';

import {connect} from 'react-redux';
import {BrowserRouter, BrowserRouterProps, HashRouter} from 'react-router-dom';
import {loadFeatured} from './actions/seriesActions';
import {ISerie} from './api/Serie';
import routes from './routes';


interface IAppProps {
    featured: ISerie[];
    dispatch: any;
    useBrowserRouter?: boolean;
    browserRouterConf?: BrowserRouterProps;
}

class App extends React.Component<IAppProps, any> {

    constructor(props: IAppProps) {
        super(props);
        this.props.dispatch(loadFeatured(this.props.featured));
    }

    public render(): any {
        return (
            <div className="App">
                {this.renderRouter()}
            </div>
        );
    }

    public renderRouter() {
        const {useBrowserRouter, browserRouterConf} = this.props;
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
