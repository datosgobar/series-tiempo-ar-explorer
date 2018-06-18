import * as React from "react";
import * as ReactDOM from "react-dom";

import { configure, mount } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';

import * as AutoComplete from 'react-autocomplete';
import { ISerieApi } from "../../../../api/SerieApi";
import Searcher from "../../../../components/common/searcher/Searcher";
import MockApi from "../../../api/mockApi";


configure({ adapter: new Adapter() });


describe('SeriesPicker', () => {

    let mockSeriesApi: ISerieApi;
    let q: string;
    let offset: number;
    let limit: number;
    let datasetSource: string;
    let datasetTheme: string;

    let renderSearchResults: any;

    beforeEach(() => {

        mockSeriesApi = new MockApi(0);
        mockSeriesApi.searchSeries = jest.fn().mockImplementation(mockSeriesApi.searchSeries);
        mockSeriesApi.getSeries = jest.fn().mockImplementation(mockSeriesApi.getSeries);

        q = "consumo";
        limit = 10;
        offset = 0;
        datasetSource = "";
        datasetTheme = "";

        renderSearchResults = jest.fn();
    });

    it('searchs upon render', () => {

        mount(<Searcher datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />);

        expect(mockSeriesApi.searchSeries).toBeCalledWith(q, { datasetTheme, datasetSource, offset, limit });
    });

    it('do not queries api if q is falsy', () => {

        mount(<Searcher datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={""} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />);

        expect(mockSeriesApi.searchSeries).not.toBeCalled();
    });

    describe('search behaviour when props change', () => {

        let node: any;

        beforeEach(() => {
            node = document.createElement('div');
            ReactDOM.render(
                <Searcher datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />,
                node);
        });

        afterEach(() => {
            ReactDOM.unmountComponentAtNode(node);
        });

        it('do not search if props dont change', () => {

            ReactDOM.render(
                <Searcher datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />,
                node);

            expect(mockSeriesApi.searchSeries).toHaveBeenCalledTimes(1);
        });

        it('searchs again if props change', () => {

            q = "exportaciones";

            ReactDOM.render(
                <Searcher datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />,
                node);

            expect(mockSeriesApi.searchSeries).toHaveBeenCalledTimes(2);
        });
    });

    describe('form behaviour', () => {

        let willSearch: () => void;

        beforeEach(() => {
            willSearch = jest.fn();
        });

        it('triggers onWillSearch prop when submited', () => {

            willSearch = jest.fn();
            const wrapper = mount(<Searcher datasetTheme={datasetTheme} datasetSource={datasetSource} onWillSearch={willSearch} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />);

            wrapper.find('form').simulate('submit');

            expect(willSearch).toBeCalled();
        });

        describe('onWillSearch behaviour', () => {

            let wrapper: ReactWrapper;

            beforeEach(() => {
                wrapper = mount(<Searcher datasetTheme={datasetTheme} datasetSource={datasetSource} onWillSearch={willSearch} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />);
            });

            function inputTextAndSubmit(searchTerm: string){
                
                wrapper.find(AutoComplete).find('input').simulate('change', { target: { value: searchTerm } });

                wrapper.find('form').simulate('submit');
            }

            it('triggers onWillSearch prop with input searchterm, offset, and limit when submited', () => {

                const searchTerm = "pbi";

                inputTextAndSubmit(searchTerm);

                expect(willSearch).toBeCalledWith(searchTerm, datasetTheme, datasetSource, offset, limit);
            });

            it('do not trigger onWillSearch prop if input searchTerm is falsy', () => {

                const searchTerm = "";

                inputTextAndSubmit(searchTerm);

                expect(willSearch).not.toBeCalled();
            });
        });

        it('do not queries api when submited', () => {

            willSearch = jest.fn();
            const wrapper = mount(<Searcher datasetTheme={datasetTheme} datasetSource={datasetSource} onWillSearch={willSearch} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />);

            expect(mockSeriesApi.searchSeries).toHaveBeenCalledTimes(1);

            wrapper.find('form').simulate('submit');

            expect(mockSeriesApi.searchSeries).toHaveBeenCalledTimes(1);
        });
    });
});