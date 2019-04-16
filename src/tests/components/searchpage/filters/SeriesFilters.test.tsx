import { configure, mount } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from "react";
import SearchFilter from "../../../../components/common/selector/SearchFilter";
import { generateMockAggregations } from "../../../support/factories/series_api";


configure({ adapter: new Adapter() });

describe('FilterSources', () => {
    let onSourcePicked: (source: string) => void;

    beforeEach(() => {
        onSourcePicked = jest.fn();
    });

    it('renders a list with all the sources', () => {
        const wrapper = mount(<SearchFilter selected=""
                                            onChange={onSourcePicked}
                                            items={generateMockAggregations().dataset_source} />);
        wrapper.update();
        expect(wrapper.find(SearchFilter).find('li').length).toBe(generateMockAggregations().dataset_source.length);
    });

    generateMockAggregations().dataset_source.forEach((source, index) => {
        it('calls onSourcePicked(event, sourceId) when a source is clicked', () => {
            const wrapper = mount(<SearchFilter selected=""
                                                onChange={onSourcePicked}
                                                items={generateMockAggregations().dataset_source} />);

            wrapper.update();
            wrapper.find(SearchFilter).find('li').at(index).find('a').simulate('click');

            expect(onSourcePicked).toBeCalledWith(source.label);
        });
    });

    it('shows result count', () => {
        const wrapper = mount(<SearchFilter selected=""
                                            onChange={onSourcePicked}
                                            items={generateMockAggregations().dataset_source} />);
        wrapper.update();
        const resultList = wrapper.find(SearchFilter).find('li');
        expect(resultList.at(0).find('.result-filter-count').text()).toBe("(1)");
        expect(resultList.at(1).find('.result-filter-count').text()).toBe("(4)");
    })
});
