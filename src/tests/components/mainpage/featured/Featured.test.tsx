import { mount } from 'enzyme';
import * as React from 'react';
import Featured from '../../../../components/mainpage/featured/Featured';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const series = [
  {
    data: [],
    description: "description1",
    id: "serie_01",
    publisher: {mbox: "mail@mail.com", name: "publisher1"},
    title: "title1",
  },
  {
    data: [],
    description: "description2",
    id: "serie_02",
    publisher: {mbox: "mail@mail.com", name: "publisher2"},
    title: "title2",
  },
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