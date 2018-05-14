import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore';
import MainPage from './MainPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
