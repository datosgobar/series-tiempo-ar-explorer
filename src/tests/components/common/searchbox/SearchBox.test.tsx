import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { SearchBox } from '../../../../components/common/searchbox/SearchBox';
import configureStore from '../../../../store/configureStore';

import { configure, mount } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });


describe('searchbox', () => {
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
});