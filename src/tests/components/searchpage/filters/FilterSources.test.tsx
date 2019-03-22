import { configure, mount } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from "react";
import { ISerieApi } from "../../../../api/SerieApi";
import { FilterSources } from "../../../../components/searchpage/filters/FilterSources";
import MockApi from "../../../api/mockApi";
import { generateMockAggregations } from "../../../support/factories/series_api";


configure({ adapter: new Adapter() });

describe('FilterSources', () => {
    let seriesApi: ISerieApi;
    let onSourcePicked: (source: string) => void;

    beforeEach(() => {
        seriesApi = new MockApi(0);
        onSourcePicked = jest.fn();
    });

    it('renders a list with all the sources', () => {
        const wrapper = mount(
            <FilterSources
                seriesApi={seriesApi}
                picked=""
                onSourcePicked={onSourcePicked}
                sources={generateMockAggregations().dataset_source} />
            );

        wrapper.update();
        expect(wrapper.find(FilterSources).find('li').length).toBe(generateMockAggregations().dataset_source.length);
    });

    generateMockAggregations().dataset_source.forEach((source, index) => {
        it('calls onSourcePicked(event, sourceId) when a source is clicked', () => {
            const wrapper = mount(
                <FilterSources
                    seriesApi={seriesApi}
                    picked=""
                    onSourcePicked={onSourcePicked}
                    sources={generateMockAggregations().dataset_source} />
            );

            wrapper.update();
            wrapper.find(FilterSources).find('li').at(index).find('a').simulate('click');

            expect(onSourcePicked).toBeCalledWith(source.label);
        });
    });
});
