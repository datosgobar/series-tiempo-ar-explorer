import * as React from "react";

import { configure, mount } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';

import { ISerieApi, ISearchResultItem } from "../../../../api/SerieApi";
import SeriesPicker from "../../../../components/viewpage/seriespicker/SeriesPicker";
import MockApi from "../../../api/mockApi";


configure({ adapter: new Adapter() });


describe('SeriesPicker', () => {

    let mockSeriesApi: ISerieApi;

    beforeEach(() => {

        mockSeriesApi = new MockApi(0);
        mockSeriesApi.searchSeries = jest.fn().mockImplementation(mockSeriesApi.searchSeries);
        mockSeriesApi.getSeries = jest.fn().mockImplementation(mockSeriesApi.getSeries);
    });

    it('searchs and show results', () => {

        const onPick = jest.fn();
        const searchTerm = "hola";

        const searchResults: ISearchResultItem[] = [
            {
                description: "description",
                id: "serie1",
                title: "title",
            },
        ];
        const promise = Promise.resolve(searchResults);
        const mockSearch = jest.fn().mockReturnValue(promise);
        mockSeriesApi.searchSeries = mockSearch;

        const wrapper = mount(<SeriesPicker seriesApi={mockSeriesApi} onPick={onPick} />);

        (wrapper.find('input#searchterm').instance() as React.InputHTMLAttributes<any>).value = searchTerm
        wrapper.find('input#searchterm').simulate('change');
        wrapper.find('form').simulate('submit');

        expect(mockSearch).toBeCalledWith(searchTerm, 0, 4);

        return promise.then(() => {
            expect(wrapper.find('.SearchResults').exists()).toBeTruthy();
        });
    });
});