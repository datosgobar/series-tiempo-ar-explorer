import * as React from 'react';
import './App.css';

import {connect} from 'react-redux';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {loadFeatured} from './actions/seriesActions';
import {ISerie} from './api/Serie';
import routes from './routes';


interface IAppProps {
    featured: ISerie[];
    dispatch: any;
    useBrowserRouter?: boolean;
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
        return React.createElement(this.getRouter(), null, routes);
    }

    private getRouter() {
        if (this.props.useBrowserRouter) {
            return BrowserRouter;
        } else {
            return HashRouter;
        }
    }
}

export default connect()(App);
