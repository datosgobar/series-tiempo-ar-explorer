import { IChartTypeProps } from "../../../components/viewpage/graphic/Graphic"
import { hasSpecifiedChartType, getSelectedChartType } from "../../../helpers/common/chartTypeHandling";
import { DEFAULT_CHART_TYPE } from "../../../api/ChartTypeSelector";

describe("Verification of a serie having a specific chartType assigned", () => {

    let chartTypes: IChartTypeProps;
    let serieID: string;

    it("If the serie's ID is has an exact match on the types' keys, true is returned", () => {
        serieID = "serieOne";
        chartTypes = {
            'serieOne': 'column',
            'serieTwo': 'area'
        };
        expect(hasSpecifiedChartType(serieID, chartTypes)).toBe(true);
    });
    it("If the serie's ID is compose and at least its base is used as a key, true is returned", () => {
        serieID = 'serieA:change';
        chartTypes = {
            'serieA': 'area'
        };
        expect(hasSpecifiedChartType(serieID, chartTypes)).toBe(true);
    });
    it("If nor the serie's full nor base ID are used as keys, false is returned", () => {
        serieID = 'serieThree';
        chartTypes = {
            'serieFour': 'line',
            'serieB': 'column'
        };
        expect(hasSpecifiedChartType(serieID, chartTypes)).toBe(false);
    })

})

describe("Obtention of the initially selected chartType from a config", () => {

    let chartTypesProp: IChartTypeProps;
    let involvedIDs: string[];
    let chartTypeProp: string;
    let selectedChartType: string;

    beforeAll(() => {
        involvedIDs = ['serieOne', 'serieOne:change', 'serieTwo'];
    })

    it("If the chartType prop is employed, then it is the selected one", () => {
        chartTypesProp = {
            'serieOne': 'column'
        };
        chartTypeProp = 'area';
        selectedChartType = getSelectedChartType(chartTypesProp, involvedIDs, chartTypeProp);
        expect(selectedChartType).toEqual('area');
    });

    describe("Tests without using the chartType prop", () => {

        it("If every specified type is the default one, such is the selected one", () => {
            chartTypesProp = {
                'serieOne:change': DEFAULT_CHART_TYPE
            };
            selectedChartType = getSelectedChartType(chartTypesProp, involvedIDs);
            expect(selectedChartType).toEqual(DEFAULT_CHART_TYPE);
        });
        it("If every serie has a specified chartType and they're all the same, that's the selected one", () => {
            chartTypesProp = {
                'serieOne': 'column',
                'serieTwo': 'column'
            };
            selectedChartType = getSelectedChartType(chartTypesProp, involvedIDs);
            expect(selectedChartType).toEqual('column');
        });
        it("If every serie has a specified chartType but they're not all the same, the default is the selected one", () => {
            chartTypesProp = {
                'serieOne': 'line',
                'serieTwo': 'column'
            };
            selectedChartType = getSelectedChartType(chartTypesProp, involvedIDs);
            expect(selectedChartType).toEqual(DEFAULT_CHART_TYPE);
        });
        it("If neither the chartTypes prop is employed, the default type is the selected onde", () => {
            chartTypesProp = {};
            selectedChartType = getSelectedChartType(chartTypesProp, involvedIDs);
            expect(selectedChartType).toEqual(DEFAULT_CHART_TYPE);
        });

    })

})