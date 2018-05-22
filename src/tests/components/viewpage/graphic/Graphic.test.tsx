import { shallow } from 'enzyme';
import * as React from 'react';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import DataPoint from '../../../../api/DataPoint';
import { ISerie } from '../../../../api/Serie';

import Graphic from '../../../../components/viewpage/graphic/Graphic';


const series: ISerie[] = [
    {
        data: [
            new DataPoint(['2018-04-01', 100], 1),
        ],
        description: 'description',
        id: 'id',
        publisher: { mbox: 'mail', name: 'publi' },
        title: 'title',
    }
];

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const wrapper = shallow(<Graphic series={[]}/>);

    expect(wrapper.find('.Graphic').exists()).toBe(true);
});

it('renders without crashing', () => {
    const wrapper = shallow(<Graphic series={series} />);

    expect(wrapper.find('.Graphic').exists()).toBe(true);
});
