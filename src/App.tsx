import * as React from 'react';
import './App.css';

import MainPage from './components/mainpage/MainPage';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <MainPage />
      </div>
    );
  }
}

export default App;
