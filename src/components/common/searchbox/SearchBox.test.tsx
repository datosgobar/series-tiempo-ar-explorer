import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from '../../../store/configureStore';
import SearchBox from './SearchBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <SearchBox />
      </Provider>
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
