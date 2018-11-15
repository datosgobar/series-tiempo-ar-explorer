import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {MemoryRouter} from 'react-router';
import Featured from '../../../../components/mainpage/featured/Featured';
import Card from '../../../../components/style/Card/Card';
import MockApi from "../../../api/mockApi";


configure({ adapter: new Adapter() });

const ids = ["serie01", "serie02"];

describe('Featured ', () => {

  it('renders without crashing', () => {
    const wrapper = mount(<Featured featured={ids} seriesApi={new MockApi(0)} />);

    expect(wrapper.find(Card).exists()).toBeFalsy();
  });

  it('renders featured serie in card', () => {

    const wrapper = mount(
      <MemoryRouter>
        <Featured featured={ids} seriesApi={new MockApi(0)}/>
      </MemoryRouter>
    );

    expect(wrapper.find(Card).length).toBe(1);
  });

  it('renders featured series in cards', () => {

    const wrapper = mount(
      <MemoryRouter>
        <Featured featured={ids} seriesApi={new MockApi(0)}/>
      </MemoryRouter>
    );

    expect(wrapper.find(Card).length).toBe(2);
  });


});
