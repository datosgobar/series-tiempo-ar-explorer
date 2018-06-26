import { mount } from 'enzyme';
import * as React from 'react';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import MetaData from '../../../../components/viewpage/metadata/MetaData';
import { generateSeries } from '../../../support/factories/series_api';


const series = generateSeries();

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const onRemove = jest.fn();

    const wrapper = mount(<MetaData series={series} onRemove={onRemove} />);

    expect(wrapper.find('.MetaData').exists()).toBe(true);
});
