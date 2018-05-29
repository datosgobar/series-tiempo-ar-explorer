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
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App seriesApi={new MockApi(0)} featured={[]}/>
      </Provider>
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
