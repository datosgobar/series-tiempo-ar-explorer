import { shallow } from 'enzyme';
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
    const wrapper = shallow(<MetaData series={series} />);

    expect(wrapper.find('.MetaData').exists()).toBe(true);
});
