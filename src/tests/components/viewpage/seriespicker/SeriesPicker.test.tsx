import * as React from "react";
import {Provider} from "react-redux";

import {configure, mount} from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as AutoComplete from 'react-autocomplete';
import {setSeriesApi} from "../../../../actions/seriesActions";
import {ITSMeta} from "../../../../api/ITSAPIResponse";
import SearchResult from "../../../../api/SearchResult";
import {ISerie} from "../../../../api/Serie";
import {ISerieApi} from "../../../../api/SerieApi";
import Searcher from "../../../../components/common/searcher/Searcher";
import SeriesPicker from "../../../../components/viewpage/seriespicker/SeriesPicker";
import configureStore from "../../../../store/configureStore";
import MockApi from "../../../api/mockApi";
import {generateITSAPIResponse} from "../../../support/factories/series_api";


configure({ adapter: new Adapter() });


describe('SeriesPicker', () => {

    let mockSeriesApi: ISerieApi;

    beforeEach(() => {

        mockSeriesApi = new MockApi(0);
        mockSeriesApi.searchSeries = jest.fn().mockImplementation(mockSeriesApi.searchSeries);
        mockSeriesApi.fetchSeries = jest.fn().mockImplementation(mockSeriesApi.fetchSeries);
    });

    it('searchs and show results', () => {

        const onPick = jest.fn();
        const searchTerm = "hola";
        const searchResults: ISerie[] = generateITSAPIResponse(['serie01']).meta.slice(1).map(result => new SearchResult(result as ITSMeta));
        const promise = Promise.resolve(searchResults);
        const store = configureStore();
        store.dispatch(setSeriesApi(mockSeriesApi));

        const wrapper = mount(
            <Provider store={store}>
                <SeriesPicker seriesApi={mockSeriesApi} onPick={onPick} />
            </Provider>);

        wrapper.find(AutoComplete).find('input').simulate('change', { target: { value: searchTerm } });
        wrapper.find(AutoComplete).closest('form').simulate('submit');

        return promise.then(() => {
            wrapper.update();
            expect(wrapper.find(Searcher).children().length).toBe(searchResults.length);
        });
    });
});