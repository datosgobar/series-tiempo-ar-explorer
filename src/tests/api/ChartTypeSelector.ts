import ChartTypeSelector from "../../api/ChartTypeSelector";
import { generateSeries } from "../support/factories/series_api";


describe("ChartTypeSelector", () => {
    let chartTypeSelector: ChartTypeSelector;

    describe("chartTypeTo", () => {
        it("returns 'line' as default chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie1,serie2,serie3');

            expect(chartTypeSelector.chartTypeTo('serie1')).toEqual('line');
        });

        it("returns 'line' as default chart type because invalid was specified", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie1,serie2,serie3&chartType=asda');

            expect(chartTypeSelector.chartTypeTo('serie1')).toEqual('line');
        });

        it("returns 'column' as valid chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie1,serie2,serie3&chartType=column');

            expect(chartTypeSelector.chartTypeTo('serie1')).toEqual('column');
        });

        it("returns 'area' as valid chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie1,serie2,serie3&chartType=area');

            expect(chartTypeSelector.chartTypeTo('serie1')).toEqual('area');
        });

        it("returns 'line' as default chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie1,serie2,serie3&chartType=default');

            expect(chartTypeSelector.chartTypeTo('serie1')).toEqual('line');
        });
    });

    describe("getChartTypesBySeries", () => {
        it("returns specified chart types by series and default to the other one", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie1,serie2,serie3&chartTypes=serie1:area, serie2: column');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie1': 'area', 'serie2': 'column', 'serie3': 'line'});
        });

        it("returns default chartType to the invalid specified", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie1,serie2,serie3&chartTypes=serie1:area, serie2: asdasd');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie1': 'area', 'serie2': 'line', 'serie3': 'line'});
        });

        it("returns 'column' as default", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie1,serie2,serie3&chartType=column&chartTypes=serie1:area, serie2: line');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie1': 'area', 'serie2': 'line', 'serie3': 'column'});
        });
    });

});


function buildChartTypeSelector(search: string): ChartTypeSelector {
    const params = new URLSearchParams(search)
    return new ChartTypeSelector(generateSeries(), params);
}