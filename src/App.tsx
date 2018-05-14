import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadFeatured } from './actions/featuredActions';
import routes from './routes';

import Serie from './components/common/serie/Serie';


interface IAppProps{
  featured?: Serie[];
  dispatch: any;
}

class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps){
    super(props);
    this.props.dispatch(loadFeatured(this.props.featured || []));
  }

  public render(): any {
    return (
      <div className="App">
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </div>
    );
  }
}

export default connect()(App);
