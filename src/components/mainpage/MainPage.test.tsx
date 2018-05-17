import { shallow } from 'enzyme';
import * as React from 'react';
import { MainPage } from './MainPage';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<MainPage featured={[]}/>);

  expect(wrapper.find('.MainPage').exists()).toBe(true);
  expect(wrapper.find('.MainPage').find('h1').text()).toBe('Series de tiempo');
});
