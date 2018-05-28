import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import './App.css';

import { loadFeatured, setSeriesApi } from './actions/seriesActions';
import { ISerie } from './api/Serie';
import { ISerieApi } from './api/SerieApi';
import routes from './routes';


interface IAppProps{
  featured: ISerie[];
  dispatch: any;
  seriesApi: ISerieApi;
}

class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps){
    super(props);
    this.props.dispatch(setSeriesApi(this.props.seriesApi))
    this.props.dispatch(loadFeatured(this.props.featured));
  }

  public render(): any {
    return (
      <div className="App">
        <HashRouter>
          {routes}
        </HashRouter>
      </div>
    );
  }
}

export default connect()(App);
