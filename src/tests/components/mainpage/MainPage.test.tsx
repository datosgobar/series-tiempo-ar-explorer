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
  const wrapper = mount(
    <MemoryRouter>
      <MainPage featured={[]} seriesApi={seriesApi} />
    </MemoryRouter>);

  expect(wrapper.find('.MainPage').exists()).toBe(true);
  expect(wrapper.find('.MainPage').find('h1').text()).toBe('Series de tiempo');
});
