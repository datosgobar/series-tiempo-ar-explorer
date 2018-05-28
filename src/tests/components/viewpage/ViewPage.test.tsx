import { shallow } from 'enzyme';
import * as React from 'react';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import MockApi from '../../api/mockApi';

import { ViewPage } from '../../../components/viewpage/ViewPage';

const dispatch = () => null;
const mockApi = new MockApi(0);
mockApi.getSeries = jest.fn(mockApi.getSeries);

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(
      <ViewPage dispatch={dispatch} location={{ search: "?ids=serie01" }} series={[]} seriesApi={mockApi} />
  );

  expect(wrapper.find('.ViewPage').exists()).toBe(true);

  expect(mockApi.getSeries).toBeCalledWith(["serie01"]);
});
