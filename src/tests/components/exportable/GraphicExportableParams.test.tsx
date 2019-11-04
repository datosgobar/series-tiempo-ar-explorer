import { mount } from 'enzyme';
import * as React from 'react';
import GraphicExportable from '../../../components/exportable/GraphicExportable';


describe('GraphicExportable params passing', () => {
    it('startDate override API start_date', () => {
        const wrapper = mount(<GraphicExportable graphicUrl="https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=116.3_TCRC_0_M_22&last=24&start_date=208-01-08"
                                                 chartOptions={{}}
                                                 legendLabel={{}}
                                                 seriesAxis={{}}
                                                 chartTypes={{}}
                                                 decimalTooltips={{}}
                                                 startDate={"2009-10-8"} />);
        const graphicState = wrapper.state();
        const graphicStartDate = graphicState.dateRange.start;
        expect(graphicStartDate).toEqual("2009-10-8");
    });

    it('endDate override API end_date', () => {
        const wrapper = mount(<GraphicExportable graphicUrl="https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=116.3_TCRC_0_M_22&last=24&end_date=2010-10-08"
                                                 chartOptions={{}}
                                                 legendLabel={{}}
                                                 seriesAxis={{}}
                                                 chartTypes={{}}
                                                 decimalTooltips={{}}
                                                 endDate={"2009-10-8"} />);
        const graphicState = wrapper.state();
        const graphicEndDate = graphicState.dateRange.end;
        expect(graphicEndDate).toEqual("2009-10-8");
    });
})
