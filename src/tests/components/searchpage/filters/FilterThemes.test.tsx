import { configure, mount } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from "react";
import { ISerieApi } from "../../../../api/SerieApi";
import { FilterThemes } from "../../../../components/searchpage/filters/FilterThemes";
import MockApi from "../../../api/mockApi";
import { generateMockAggregations } from "../../../support/factories/series_api";


configure({ adapter: new Adapter() });

describe('FilterThemes', () => {
    let seriesApi: ISerieApi;
    let onThemePicked: (theme: string) => void;
    let wrapper: any;

    beforeEach(() => {
        seriesApi = new MockApi(0);
        onThemePicked = jest.fn();

        wrapper = mount(
            <FilterThemes
                seriesApi={seriesApi}
                picked=""
                onThemePicked={onThemePicked}
                themes={generateMockAggregations().dataset_theme} />
        );
    });

    it('renders a list with all the themes', () => {
        wrapper.update();

        expect(wrapper.find(FilterThemes).find('li').length).toBe(generateMockAggregations().dataset_theme.length);
    });

    generateMockAggregations().dataset_theme.forEach((theme, index) => {
        it('calls onThemePicked(event, themeId) when a theme is clicked', () => {
            wrapper.update();
            wrapper.find(FilterThemes).find('li').at(index).find('a').simulate('click');

            expect(onThemePicked).toBeCalledWith(theme.label);
        });
    });
});
