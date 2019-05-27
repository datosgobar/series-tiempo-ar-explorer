import ChartTypeSelector from "../../api/ChartTypeSelector";
import { generateSeries } from "../support/factories/series_api";


describe("ChartTypeSelector", () => {
    let chartTypeSelector: ChartTypeSelector;

    describe("chartTypeTo", () => {
        it("returns 'line' as default chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('line');
        });

        it("returns 'line' as default chart type because invalid was specified", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=asda');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('line');
        });

        it("returns 'column' as valid chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=column');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('column');
        });

        it("returns 'area' as valid chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=area');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('area');
        });

        it("returns 'line' as default chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=default');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('line');
        });
    });

    describe("getChartTypesBySeries", () => {
        it("returns specified chart types by series and default to the other one", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartTypes=serie01:area,serie02:column');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie01': 'area', 'serie02': 'column'});
        });

        it("returns default chartType to the invalid specified", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartTypes=serie01:area,serie02:asdasd');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie01': 'area', 'serie02': 'line'});
        });

        it("returns 'column' as default", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=column&chartTypes=serie01:area,serie02:asd');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie01': 'area', 'serie02': 'column'});
        });
    });

});


function buildChartTypeSelector(search: string): ChartTypeSelector {
    const params = new URLSearchParams(search)
    return new ChartTypeSelector(generateSeries(), params);
}