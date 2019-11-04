import { mount } from 'enzyme';
import * as React from 'react';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { ISerie } from '../../../../api/Serie';

import SerieConfig from "../../../../api/SerieConfig";
import Graphic from '../../../../components/viewpage/graphic/Graphic';
import { generateSeries } from '../../../support/factories/series_api';


const series: ISerie[] = generateSeries();

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const wrapper = mount(<Graphic series={[]} 
                                   range={{min: 0, max: 10}} 
                                   seriesConfig={[new SerieConfig(series[0])]} 
                                   locale="AR" 
                                   numbersAbbreviate={true} 
                                   decimalsBillion={2} 
                                   decimalsMillion={2}/>);

    expect(wrapper.find(Graphic).exists()).toBe(true);
});

it('renders without crashing', () => {
    const wrapper = mount(<Graphic series={series}
                                   range={{min: 0, max: 10}} 
                                   seriesConfig={[new SerieConfig(series[0])]} 
                                   locale="AR" 
                                   numbersAbbreviate={true} 
                                   decimalsBillion={2} 
                                   decimalsMillion={2}/>);

    expect(wrapper.find(Graphic).exists()).toBe(true);
});
