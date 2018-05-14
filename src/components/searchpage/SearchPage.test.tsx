import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore';
import SearchPage from './SearchPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <SearchPage />
      </Provider>
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
