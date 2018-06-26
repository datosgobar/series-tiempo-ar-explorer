import { mount } from 'enzyme';
import * as React from 'react';
import Featured from '../../../../components/mainpage/featured/Featured';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import { ISerie } from '../../../../api/Serie';
import Card from '../../../../components/style/Card/Card';

import { generateITSAPIResponse } from '../../../support/factories/series_api';


configure({ adapter: new Adapter() });

const series: ISerie[] = generateITSAPIResponse(["serie01", "serie02"]).data;

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
