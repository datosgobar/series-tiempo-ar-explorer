import ChartTypeSelector from "../../api/ChartTypeSelector";
import { generateSeries } from "../support/factories/series_api";


describe("ChartTypeSelector", () => {
    let chartTypeSelector: ChartTypeSelector;

    describe("chartTypeTo", () => {

        it("Returns 'line' as default chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('line');
        });
        it("Returns 'line' as default chart type because invalid was specified", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=asda');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('line');
        });
        it("Returns 'column' as valid chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=column');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('column');
        });
        it("Returns 'area' as valid chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=area');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('area');
        });
        it("Returns 'line' as default chart type", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=default');

            expect(chartTypeSelector.chartTypeTo('serie01')).toEqual('line');
        });

    });

    describe("getChartTypesBySeries", () => {

        it("Returns specified chart types by series and default to the other one", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartTypes=serie01:area,serie02:column');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie01': 'area', 'serie02': 'column'});
        });
        it("Returns default chartType to the invalid specified", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartTypes=serie01:area,serie02:asdasd');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie01': 'area', 'serie02': 'line'});
        });
        it("Returns 'column' as default", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie02&chartType=column&chartTypes=serie01:area,serie02:asd');

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie01': 'area', 'serie02': 'column'});
        });
        it("Using the chartType general query param, it takes into account series with representationMode modifiers", () => {
            chartTypeSelector = buildChartTypeSelector('?ids=serie01,serie01:change&chartType=area', ["serie01", "serie01:change"]);

            expect(chartTypeSelector.getChartTypesBySeries()).toEqual({'serie01': 'area', 'serie01:change': 'area'});
        });

    });

});


function buildChartTypeSelector(search: string, seriesIds = ["serie01", "serie02"]): ChartTypeSelector {
    const params = new URLSearchParams(search)
    return new ChartTypeSelector(generateSeries(seriesIds), params);
}