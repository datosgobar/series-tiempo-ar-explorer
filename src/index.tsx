import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import featured from './conf/featured';
import configureStore from './store/configureStore'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <App featured={featured}/>
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
