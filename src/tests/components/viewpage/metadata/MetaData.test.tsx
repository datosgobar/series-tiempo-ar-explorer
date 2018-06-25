import { mount } from 'enzyme';
import * as React from 'react';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { ISerie } from '../../../../api/Serie';

import MetaData from '../../../../components/viewpage/metadata/MetaData';


const series: ISerie[] = [
    {
        data: [],
        description: 'description',
        id: 'id',
        publisher: { mbox: 'mail', name: 'publi' },
        title: 'title',
    }
];

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const onRemove = jest.fn();

    const wrapper = mount(<MetaData series={series} onRemove={onRemove} />);

    expect(wrapper.find('.MetaData').exists()).toBe(true);
});
