import * as React from 'react';
import './App.css';

import routes from './routes';

class App extends React.Component {
  public render(): any {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
