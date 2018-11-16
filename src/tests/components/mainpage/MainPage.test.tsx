import { mount } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { MainPage } from '../../../components/mainpage/MainPage';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import MockApi from '../../api/mockApi';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const seriesApi = new MockApi(0);
  seriesApi.simpleFetchSeries = jest.fn(seriesApi.simpleFetchSeries);

  const wrapper = mount(
    <MemoryRouter>
      <MainPage featured={['id1', 'id2']} seriesApi={seriesApi} />
    </MemoryRouter>);

  expect(wrapper.find(MainPage).find('h1').text()).toBe('Series de tiempo');
  expect(seriesApi.simpleFetchSeries).toHaveBeenCalledTimes(2);
});
