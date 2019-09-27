import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {Provider} from "react-redux";
import {MemoryRouter} from 'react-router';
import {Store} from "redux";
import {setLaps} from "../../../actions/seriesActions";
import {MainPage} from '../../../components/mainpage/MainPage';
import configureStore from "../../../store/configureStore";
import MockApi from '../../api/mockApi';

configure({ adapter: new Adapter() });

let store: Store;

it('renders without crashing', () => {
  const seriesApi = new MockApi(0);
  seriesApi.simpleFetchSeries = jest.fn(seriesApi.simpleFetchSeries);
  store = configureStore();
  const laps = {
      Anual: 10,
      Diaria: 90,
      Mensual: 24,
      Semestral: 10,
      Trimestral: 20,
  };
  store.dispatch(setLaps(laps));

  const wrapper = mount(
    <MemoryRouter>
        <Provider store={store}>
          <MainPage featured={['id1', 'id2']} seriesApi={seriesApi} heroImageUrl="myHero.jpg"/>
        </Provider>
    </MemoryRouter>);

  expect(wrapper.find(MainPage).find('h1').text()).toBe('Series de tiempo');
  expect(seriesApi.simpleFetchSeries).toHaveBeenCalledTimes(2);
});
