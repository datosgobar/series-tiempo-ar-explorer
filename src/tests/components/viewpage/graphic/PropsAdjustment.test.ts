import { IPropsPerId, IStringPropsPerId, INumberPropsPerId } from "../../../../components/viewpage/graphic/Graphic";
import { PropsAdjuster, IAdjustmentOptions } from "../../../../helpers/graphic/propsAdjuster";

describe("Adjustment of different props for multiple IDs", () => {

    let commonEMAEId: string;
    let percentageId: string;
    let yearPercentageId: string;
    let commonMotosId: string;
    let ids: string[];
    let props: IPropsPerId;
    let chartType: string;
    let decimalTooltip: number;
    let adjuster: PropsAdjuster;
    let adjustmentOptions: IAdjustmentOptions;

    function buildAdjustmentOptionsOnlyWithChartTypes(chartTypes: IStringPropsPerId) {
        adjustmentOptions = {
            chartTypes,
            decimalTooltips: {},
            legendLabel: {},
            seriesAxis: {}
        };
    }

    function buildAdjustmentOptionsOnlyWithDecimalTooltips(decimalTooltips: INumberPropsPerId) {
        adjustmentOptions = {
            chartTypes: {},
            decimalTooltips,
            legendLabel: {},
            seriesAxis: {}
        };
    }

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
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toEqual('area');
        });
        it('ID with modifier, just a basic setter adjusts it', () => {
            ids = [percentageId];
            props = {
                'EMAE2004': 'area'
            };
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
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
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toEqual('area');
            expect(props['EMAE2004:percent_change']).toEqual('area');
        });
        it('Specific setter adjusts only one of them', () => {
            props = {
                'EMAE2004:percent_change': 'area'
            };
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
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
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
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
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
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
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
            expect(props['EMAE2004:percent_change']).toEqual('column');
            expect(props['EMAE2004:percent_change_a_year_ago']).toEqual('column');
        });
        it('Specific setter adjusts only one', () => {
            props = {
                'EMAE2004:percent_change_a_year_ago': 'column'
            };
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
            expect(props['EMAE2004:percent_change']).toBeUndefined();
            expect(props['EMAE2004:percent_change_a_year_ago']).toEqual('column');
        });
        it('Specific setter adjusts only one, basic adjusts the other', () => {
            props = {
                'EMAE2004': 'area',
                'EMAE2004:percent_change_a_year_ago': 'column'
            };
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjuster.adjustAll(adjustmentOptions);
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
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjustmentOptions.chartType = chartType;
            adjuster.adjustAll(adjustmentOptions);
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
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjustmentOptions.chartType = chartType;
            adjuster.adjustAll(adjustmentOptions);
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
            buildAdjustmentOptionsOnlyWithChartTypes(props);
            adjustmentOptions.chartType = chartType;
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toEqual('area');
            expect(props['EMAE2004:percent_change']).toEqual('area');
            expect(props.Motos_patentamiento_8myrF9).toEqual('line');
        });

    })

    describe('Adjustment of a numeric value prop: the decimalTooltips object', () => {

        beforeAll(() => {
            ids = [commonEMAEId, percentageId, commonMotosId];
        })

        it('Two different series, basic setter affects only the ones with same pure ID', () => {
            props = {
                'EMAE2004': 4
            };
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithDecimalTooltips(props);
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toEqual(4);
            expect(props['EMAE2004:percent_change']).toEqual(4);
            expect(props.Motos_patentamiento_8myrF9).toBeUndefined();
        });
        it('Two different series, specific setter only affects its ID', () => {
            props = {
                'EMAE2004:percent_change': 7
            };
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithDecimalTooltips(props);
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toBeUndefined();
            expect(props['EMAE2004:percent_change']).toEqual(7);
            expect(props.Motos_patentamiento_8myrF9).toBeUndefined();
        });
        it('Specific setter adjusts only one, basic adjusts the other', () => {
            props = {
                'EMAE2004': 3,
                'EMAE2004:percent_change': 0
            };
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithDecimalTooltips(props);
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toEqual(3);
            expect(props['EMAE2004:percent_change']).toEqual(0);
            expect(props.Motos_patentamiento_8myrF9).toBeUndefined();
        });

    })

    describe('With presence of decimalTooltip parameter', () => {

        beforeAll(() => {
            ids = [commonEMAEId, percentageId, commonMotosId];
        })

        it('Two different series, basic setter affects all from an ID, decimalTooltip sets the unspecified', () => {
            props = {
                'EMAE2004': 5
            };
            decimalTooltip = 2;
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithDecimalTooltips(props);
            adjustmentOptions.decimalTooltip = decimalTooltip;
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toEqual(5);
            expect(props['EMAE2004:percent_change']).toEqual(5);
            expect(props.Motos_patentamiento_8myrF9).toEqual(2);
        });
        it('Two different series, specific setter only affects its ID, decimalTooltip sets the unspecified', () => {
            props = {
                'EMAE2004:percent_change': 1
            };
            decimalTooltip = 3;
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithDecimalTooltips(props);
            adjustmentOptions.decimalTooltip = decimalTooltip;
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toEqual(3);
            expect(props['EMAE2004:percent_change']).toEqual(1);
            expect(props.Motos_patentamiento_8myrF9).toEqual(3);
        });
        it('Two different series, decimalTooltip does not affect because of existing setters for each serie', () => {
            props = {
                'EMAE2004': 6,
                'Motos_patentamiento_8myrF9': 8
            };
            decimalTooltip = 4;
            adjuster = new PropsAdjuster(ids);
            buildAdjustmentOptionsOnlyWithDecimalTooltips(props);
            adjustmentOptions.decimalTooltip = decimalTooltip;
            adjuster.adjustAll(adjustmentOptions);
            expect(props.EMAE2004).toEqual(6);
            expect(props['EMAE2004:percent_change']).toEqual(6);
            expect(props.Motos_patentamiento_8myrF9).toEqual(8);
        });

    })

})