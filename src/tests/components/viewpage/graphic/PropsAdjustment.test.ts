import { IPropsPerId } from "../../../../components/viewpage/graphic/Graphic";
import { PropsAdjuster } from "../../../../components/viewpage/graphic/propsAdjuster";

describe("Adjustment of different props for multiple IDs", () => {

    let commonEMAEId: string;
    let percentageId: string;
    let yearPercentageId: string;
    let commonMotosId: string;
    let ids: string[];
    let props: IPropsPerId;
    let chartType: string;
    let adjuster: PropsAdjuster;

    beforeAll(() => {
        commonEMAEId = 'EMAE2004';
        percentageId = 'EMAE2004:percent_change';
        yearPercentageId = 'EMAE2004:percent_change_a_year_ago';
        commonMotosId = 'Motos_patentamiento_8myrF9';
    })

    describe('Single IDs', () => {

        it('ID without modifier, basic setter acts directly', () => {
            ids = [commonEMAEId];
            props = {
                'EMAE2004': 'area'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props.EMAE2004).toEqual('area');
        });
        it('ID with modifier, just a basic setter adjusts it', () => {
            ids = [percentageId];
            props = {
                'EMAE2004': 'area'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props['EMAE2004:percent_change']).toEqual('area');
        });

    })

    describe('An ID with modifier and another one without it', () => {

        beforeAll(() => {
            ids = [commonEMAEId, percentageId];
        })

        it('Basic setter adjusts both', () => {
            props = {
                'EMAE2004': 'area'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props.EMAE2004).toEqual('area');
            expect(props['EMAE2004:percent_change']).toEqual('area');
        });
        it('Specific setter adjusts only one of them', () => {
            props = {
                'EMAE2004:percent_change': 'area'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props.EMAE2004).toBeUndefined();
            expect(props['EMAE2004:percent_change']).toEqual('area');
        });

    })

    describe('Multiple IDs from the same serie', () => {

        it('Only one serie at all, both specific and basic setters', () => {
            ids = [commonEMAEId, percentageId, yearPercentageId];
            props = {
                'EMAE2004': 'column',
                'EMAE2004:percent_change': 'area'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props.EMAE2004).toEqual('column');
            expect(props['EMAE2004:percent_change']).toEqual('area');
            expect(props['EMAE2004:percent_change_a_year_ago']).toEqual('column');
        });
        it('Two different series, setters only affect the IDs of their series', () => {
            ids = [commonEMAEId, percentageId, yearPercentageId, commonMotosId];
            props = {
                'EMAE2004': 'column'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props.EMAE2004).toEqual('column');
            expect(props['EMAE2004:percent_change']).toEqual('column');
            expect(props['EMAE2004:percent_change_a_year_ago']).toEqual('column');
            expect(props.Motos_patentamiento_8myrF9).toBeUndefined();
        });

    })

    describe('Two IDs with modifier', () => {

        beforeAll(() => {
            ids = [percentageId, yearPercentageId];
        })

        it('Basic setter adjusts both', () => {
            props = {
                'EMAE2004': 'column'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props['EMAE2004:percent_change']).toEqual('column');
            expect(props['EMAE2004:percent_change_a_year_ago']).toEqual('column');
        });
        it('Specific setter adjusts only one', () => {
            props = {
                'EMAE2004:percent_change_a_year_ago': 'column'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props['EMAE2004:percent_change']).toBeUndefined();
            expect(props['EMAE2004:percent_change_a_year_ago']).toEqual('column');
        });
        it('Specific setter adjusts only one, basic adjusts the other', () => {
            props = {
                'EMAE2004': 'area',
                'EMAE2004:percent_change_a_year_ago': 'column'
            };
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props);
            expect(props['EMAE2004:percent_change']).toEqual('area');
            expect(props['EMAE2004:percent_change_a_year_ago']).toEqual('column');
        });

    })

    describe('With presence of chartType parameter', () => {

        beforeAll(() => {
            ids = [commonEMAEId, percentageId, commonMotosId];
        })

        it('Two different series, basic setter affects all from an ID, chartType affects the unspecified', () => {
            props = {
                'EMAE2004': 'column'
            };
            chartType = 'area';
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props, {}, {}, chartType);
            expect(props.EMAE2004).toEqual('column');
            expect(props['EMAE2004:percent_change']).toEqual('column');
            expect(props.Motos_patentamiento_8myrF9).toEqual('area');
        });
        it('Two different series, specific setter only affects its ID, chartType affects the unspecified', () => {
            props = {
                'EMAE2004:percent_change': 'column'
            };
            chartType = 'area';
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props, {}, {}, chartType);
            expect(props.EMAE2004).toEqual('area');
            expect(props['EMAE2004:percent_change']).toEqual('column');
            expect(props.Motos_patentamiento_8myrF9).toEqual('area');
        });
        it('Two different series, chartType does not affect because of existing setters for each serie', () => {
            props = {
                'EMAE2004': 'area',
                'Motos_patentamiento_8myrF9': 'line'
            };
            chartType = 'column';
            adjuster = new PropsAdjuster(ids);
            adjuster.adjustAll(props, {}, {}, chartType);
            expect(props.EMAE2004).toEqual('area');
            expect(props['EMAE2004:percent_change']).toEqual('area');
            expect(props.Motos_patentamiento_8myrF9).toEqual('line');
        });

    })

})