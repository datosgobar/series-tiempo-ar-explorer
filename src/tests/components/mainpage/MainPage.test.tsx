import { mount } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { MainPage } from '../../../components/mainpage/MainPage';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {

  const wrapper = mount(
    <MemoryRouter>
      <MainPage featured={[]} />
    </MemoryRouter>);

  expect(wrapper.find(MainPage).find('h1').text()).toBe('Series de tiempo');
});
