import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import MockApi from '../../api/mockApi';

import { setSeriesApi } from '../../../actions/seriesActions';
import { ISerieApi } from '../../../api/SerieApi';
import ViewPage, { ViewPage as UnconnectedViewPage } from '../../../components/viewpage/ViewPage';
import configureStore from '../../../store/configureStore';

import * as $ from 'jquery'; // Necessary because DetallePanel and AddAndCustomizeSeriesButton access to jquery directly

const globalAny:any = global;

globalAny.$ = $;

configure({ adapter: new Adapter() });

describe('ViewPage', () => {

    const clickEvent = ({} as React.MouseEvent<HTMLAnchorElement>);
    let mockApi: ISerieApi;
    let store: Store;

    beforeEach(() => {
        mockApi = new MockApi(0);
        mockApi.fetchSeries = jest.fn(mockApi.fetchSeries);

        store = configureStore();
        store.dispatch(setSeriesApi(mockApi))
    });

    function renderViewPage(url: string) {
        return mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[url]} initialIndex={0}>
                    <ViewPage />
                </MemoryRouter>
            </Provider>);
    }

    it('renders without crashing', () => {

        const wrapper = renderViewPage('/view/?ids=serie01');

        expect(wrapper.find('#detalle').exists()).toBe(true);
    });

    it('fetches series on the url upon render', () => {

        renderViewPage('/view/?ids=serie01');

        expect(mockApi.fetchSeries).toBeCalledWith(["serie01"]);
    });

    it('does not fetch series if no ids were provided in the url', () => {

        renderViewPage('/view/');

        expect(mockApi.fetchSeries).not.toBeCalled();
    });

    it('on Serie picked adds id to ids queryParam', () => {

        const dispatch = jest.fn();

        const unlisten = jest.fn();
        const history = {
            listen: jest.fn().mockImplementation(unlisten),
            push: jest.fn(),
        };

        const wrapper = mount(
            <UnconnectedViewPage
                series={[]}
                seriesApi={mockApi}
                location={location}
                dispatch={dispatch}
                history={history as any}
                date={{start: '', end: ''}}
            />);

        (wrapper.instance() as UnconnectedViewPage).addPickedSerie(clickEvent, 'serie01');

        expect(history.push).toBeCalledWith('/view/?ids=serie01')
    });

    describe('path behaviour', () => {

        const dispatch = jest.fn();

        const unlistenMock = jest.fn();
        let locationMock: {search: string};

        let historyMock: any;

        let wrapper: any;

        beforeEach(() => {
            dispatch.mockReset();
            unlistenMock.mockReset();

            locationMock = {
                search: "",
            };

            historyMock = {
                listen: jest.fn(() => unlistenMock),
                push: jest.fn((path: string) => {
                    locationMock.search = '?' + path.split('?')[1]
                }),
            };

            wrapper = mount(
                <UnconnectedViewPage
                    series={[]}
                    seriesApi={mockApi}
                    location={locationMock}
                    dispatch={dispatch}
                    history={historyMock as any}
                    date={{start: '', end: ''}}
                />);
        });

        it('on Serie picked adds id to ids queryParam', () => {

            (wrapper.instance() as UnconnectedViewPage).addPickedSerie(clickEvent, 'serie01');

            (wrapper.instance() as UnconnectedViewPage).addPickedSerie(clickEvent, 'serie02');

            expect(historyMock.push).toBeCalledWith('/view/?ids=serie01,serie02')
        });

        it('keeps other params untouched', () => {

            historyMock.push('/view/?ids=serie01&other=params');

            (wrapper.instance() as UnconnectedViewPage).addPickedSerie(clickEvent, 'serie02');

            expect(historyMock.push).toBeCalledWith('/view/?ids=serie01,serie02&other=params')
        });

        it('observes history', () => {

            expect(historyMock.listen).toHaveBeenCalledTimes(1);
        });

        it('unsubscribe of history when unmounted', () => {

            wrapper.unmount();

            expect(unlistenMock).toHaveBeenCalledTimes(1);
        });
    });
});