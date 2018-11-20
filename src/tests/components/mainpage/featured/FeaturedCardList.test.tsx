import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
import {Store} from "redux";
import {setLaps} from "../../../../actions/seriesActions";
import FeaturedCardList from "../../../../components/mainpage/featured/FeaturedCardList";
import Card from '../../../../components/style/Card/Card';
import configureStore from "../../../../store/configureStore";
import {toSerie} from "../../../api/mockApi";


configure({ adapter: new Adapter() });

const ids = ["serie01", "serie02"];

describe('Featured ', () => {
  let store: Store;
  store = configureStore();
  const laps = {
    Anual: 10,
    Diaria: 90,
    Mensual: 24,
    Semestral: 10,
    Trimestral: 20,
  };
  store.dispatch(setLaps(laps));

  it('renders without crashing', () => {
      const wrapper = mount(
    <Provider store={store}>
            <FeaturedCardList seriesOrder={ids} series={[]} />
          </Provider>);

    expect(wrapper.find(Card).exists()).toBeFalsy();
  });

  it('renders featured serie in card', () => {
    const series = [toSerie("serie01"), toSerie("serie02"), ];
    const wrapper = mount(
        <MemoryRouter>
            <Provider store={store}>
                <FeaturedCardList seriesOrder={ids} series={series} />
            </Provider>
        </MemoryRouter>);

    expect(wrapper.find(Card).length).toBe(2)
  });

});
