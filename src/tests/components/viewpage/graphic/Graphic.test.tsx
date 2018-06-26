import { mount } from 'enzyme';
import * as React from 'react';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { ISerie } from '../../../../api/Serie';

import Graphic from '../../../../components/viewpage/graphic/Graphic';
import { generateITSAPIResponse } from '../../../support/factories/series_api';


const series: ISerie[] = generateITSAPIResponse(['id']).data;

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const wrapper = mount(<Graphic series={[]}/>);

    expect(wrapper.find(Graphic).exists()).toBe(true);
});

it('renders without crashing', () => {
    const wrapper = mount(<Graphic series={series} />);

    expect(wrapper.find(Graphic).exists()).toBe(true);
});
