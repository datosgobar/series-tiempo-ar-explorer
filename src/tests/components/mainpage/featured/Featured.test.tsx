import { mount } from 'enzyme';
import * as React from 'react';
import Featured from '../../../../components/mainpage/featured/Featured';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import { ISerie } from '../../../../api/Serie';
import Card from '../../../../components/style/Card/Card';

configure({ adapter: new Adapter() });

const series: ISerie[] = [
  {
    data: [],
    description: "description1",
    id: "serie_01",
    publisher: { mbox: "mail@mail.com", name: "publisher1" },
    title: "title1",
  },
  {
    data: [],
    description: "description2",
    id: "serie_02",
    publisher: { mbox: "mail@mail.com", name: "publisher2" },
    title: "title2",
  },
];

describe('Featured ', () => {

  it('renders without crashing', () => {
    const wrapper = mount(<Featured featured={[]} />);

    expect(wrapper.find(Card).exists()).toBeFalsy();
  });

  it('renders featured serie in card', () => {

    const wrapper = mount(
      <MemoryRouter>
        <Featured featured={[series[0]]} />
      </MemoryRouter>
    );

    expect(wrapper.find(Card).length).toBe(1);
  });

  it('renders featured series in cards', () => {

    const wrapper = mount(
      <MemoryRouter>
        <Featured featured={series} />
      </MemoryRouter>
    );

    expect(wrapper.find(Card).length).toBe(2);
  });


});
