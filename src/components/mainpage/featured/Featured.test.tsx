import { mount } from 'enzyme';
import * as React from 'react';
import { Featured } from './Featured';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const series = [
  { id: 1, name: "serie 01", author: "author", description: "description" },
  { id: 1, name: "serie 02", author: "author", description: "description" }
];

describe('Featured ', () => {

  it('renders without crashing', () => {
    const wrapper = mount(<Featured featured={[]} />);

    expect(wrapper.find('h3').text()).toEqual('Series Destacadas:');
    expect(wrapper.find('.Card').exists()).toBe(false);
  });

  it('renders featured series in cards', () => {

    const wrapper = mount(<Featured featured={[series[0]]} />);

    expect(wrapper.find('.Card').find('.Serie').length).toBe(1);
  });

  it('renders featured series in cards', () => {

    const wrapper = mount(<Featured featured={[series[0], series[1]]} />);

    expect(wrapper.find('.Card').find('.Serie').length).toBe(2);
  });


});