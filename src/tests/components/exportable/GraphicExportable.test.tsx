import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import GraphicExportable from '../../../components/exportable/GraphicExportable';


configure({ adapter: new Adapter() });

describe('GraphicExportable', () => {
    it('renders without crashing', () => {
        const wrapper = mount(<GraphicExportable graphicUrl="https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=116.3_TCRC_0_M_22&last=24"
                                                 chartOptions={{}}
                                                 legendLabel={{}}
                                                 seriesAxis={{}}
                                                 chartTypes={{}}
                                                 decimalTooltips={{}} />);

        expect(wrapper.find(GraphicExportable).exists()).toBe(true);
    });

})
