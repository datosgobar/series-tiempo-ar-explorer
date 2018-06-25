import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import SearchBox from '../../../../components/common/searchbox/SearchBox';

import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16';
import MockApi from '../../../api/mockApi';


configure({ adapter: new Adapter() });


describe('searchbox', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const seriesApi = new MockApi(0);
    const onSearch = jest.fn();
    const onSelect = jest.fn();
    ReactDOM.render(
      <MemoryRouter>
          <SearchBox onSearch={onSearch} seriesApi={seriesApi} onSelect={onSelect}/>
      </MemoryRouter>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });
});