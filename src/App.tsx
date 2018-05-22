import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import {HashRouter} from 'react-router-dom';
import { loadFeatured } from './actions/featuredActions';
import { ISerie } from './components/common/serie/Serie';
import routes from './routes';


interface IAppProps{
  featured: ISerie[];
  dispatch: any;
}

class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps){
    super(props);
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
