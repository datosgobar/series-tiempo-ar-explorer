import * as React from "react";
import * as ReactDOM from "react-dom";

import { configure, mount } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';

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
    let publisher: string;
    let units: string;

    beforeEach(() => {
        mockSeriesApi = new MockApi(0);
        mockSeriesApi.searchSeries = jest.fn().mockImplementation(mockSeriesApi.searchSeries);
        mockSeriesApi.fetchSeries = jest.fn().mockImplementation(mockSeriesApi.fetchSeries);

        q = "consumo";
        limit = 10;
        offset = 0;
        datasetSource = "";
        datasetTheme = "";
        publisher = "";
        units = "";

        renderSearchResults = jest.fn();
    });

    it('searches upon render', () => {
        mount(<Searcher units={units} publisher={publisher} datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />);
        setTimeout(() =>
            expect(mockSeriesApi.searchSeries).toBeCalledWith(q, { datasetTheme, datasetSource, offset, limit })
        , 0);
    });

    it('do not queries api if q is falsy', () => {
        mount(<Searcher units={units} publisher={publisher} datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={""} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />);

        expect(mockSeriesApi.searchSeries).not.toBeCalled();
    });

    describe('search behaviour when props change', () => {
        let node: any;

        beforeEach(() => {
            node = document.createElement('div');
            ReactDOM.render(
                <Searcher units={units} publisher={publisher} datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />,
                node);
        });

        afterEach(() => {
            ReactDOM.unmountComponentAtNode(node);
        });

        it('do not search if props dont change', () => {
            ReactDOM.render(
                <Searcher units={units} publisher={publisher} datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />,
                node);

            setTimeout(() =>
                expect(mockSeriesApi.searchSeries).toHaveBeenCalledTimes(1)
            , 0);
        });

        it('searchs again if props change', () => {
            q = "exportaciones";

            ReactDOM.render(
                <Searcher units={units} publisher={publisher} datasetTheme={datasetTheme} datasetSource={datasetSource} seriesApi={mockSeriesApi} q={q} offset={offset} limit={limit} renderSearchResults={renderSearchResults} />,
                node);

            setTimeout(() =>
                expect(mockSeriesApi.searchSeries).toHaveBeenCalledTimes(2)
            , 0)
        });
    });
});