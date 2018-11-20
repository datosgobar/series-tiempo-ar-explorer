import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store/configureStore';
import MockApi from './tests/api/mockApi';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  const lapsInfo = {
      Anual: 10,
      Diaria: 90,
      Mensual: 24,
      Semestral: 10,
      Trimestral: 20,
  };

  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App seriesApi={new MockApi(0)} featuredIds={[]} laps={lapsInfo} />
      </Provider>
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
