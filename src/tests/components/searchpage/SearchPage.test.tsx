import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from '../../../components/searchpage/SearchPage';
import configureStore from '../../../store/configureStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <SearchPage />
      </Provider>
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
