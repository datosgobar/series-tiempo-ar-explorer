import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore';
import Featured from './Featured';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(
    <Provider store={store}>
      <Featured />
    </Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
