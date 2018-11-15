import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {MemoryRouter} from "react-router";
import FeaturedCardList from "../../../../components/mainpage/featured/FeaturedCardList";
import Card from '../../../../components/style/Card/Card';
import {toSerie} from "../../../api/mockApi";


configure({ adapter: new Adapter() });

const ids = ["serie01", "serie02"];

describe('Featured ', () => {
  it('renders without crashing', () => {
      const wrapper = mount(<FeaturedCardList seriesOrder={ids} series={[]} />);

    expect(wrapper.find(Card).exists()).toBeFalsy();
  });

  it('renders featured serie in card', () => {
    const series = [toSerie("serie01"), toSerie("serie02"), ];
    const wrapper = mount(
        <MemoryRouter>
            <FeaturedCardList seriesOrder={ids} series={series} />
        </MemoryRouter>);

    expect(wrapper.find(Card).length).toBe(2)
  });

});
