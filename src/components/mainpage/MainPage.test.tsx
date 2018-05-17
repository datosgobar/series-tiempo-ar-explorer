import { shallow } from 'enzyme';
import * as React from 'react';
import { MainPage } from './MainPage';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const series = [
  {
    description: "description1",
    id: "serie_01",
    publisher: {mbox: "mail@mail.com", name: "publisher1"},
    title: "title1",
  },
  {
    description: "description2",
    id: "serie_02",
    publisher: {mbox: "mail@mail.com", name: "publisher2"},
    title: "title2",
  },
];

it('renders without crashing', () => {
  const wrapper = shallow(<MainPage featured={series}/>);

  expect(wrapper.find('.MainPage').exists()).toBe(true);
  expect(wrapper.find('.MainPage').find('h1').text()).toBe('Series de tiempo');
});
