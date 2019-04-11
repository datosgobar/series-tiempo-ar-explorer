import { configure, mount, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as $ from 'jquery'; // Necessary because DetallePanel and AddAndCustomizeSeriesButton access to jquery directly
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import { setSeriesApi } from '../../../actions/seriesActions';
import { ISerieApi } from '../../../api/SerieApi';
import ViewPage, { ViewPage as UnconnectedViewPage } from '../../../components/viewpage/ViewPage';
import configureStore from '../../../store/configureStore';
import MockApi from '../../api/mockApi';


const globalAny:any = global;
globalAny.$ = $;

window.scrollTo = () => { return } // Mute error: "Not implemented: window.scrollTo"

configure({ adapter: new Adapter() });

describe('ViewPage', () => {
    const clickEvent = ({} as React.MouseEvent<HTMLButtonElement>);
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
        const wrapper = renderViewPage('/series/?ids=serie01');

        expect(wrapper.find('#detalle').exists()).toBe(true);
    });

    it('fetches series on the url upon render', () => {
        renderViewPage('/series/?ids=serie01');

        expect(mockApi.fetchSeries).toBeCalledWith({
            collapse: '',
            collapseAggregation: '',
            ids: ["serie01"],
            last: '',
            representationMode: '',
        });
    });

    describe('collapse', () => {
        it('does not fetch using collapse if collapse_aggregation is not specified', () => {
            renderViewPage('/series/?ids=serie01:sum');

            expect(mockApi.fetchSeries).toBeCalledWith({
                collapse: '',
                collapseAggregation: '',
                ids: ["serie01:sum"],
                last: '',
                representationMode: '',
            });
        });

        it('does not fetch using collapse if collapse_aggregation is invalid', () => {
            renderViewPage('/series/?ids=serie01:sum&collapse=foo');

            expect(mockApi.fetchSeries).toBeCalledWith({
                collapse: 'foo',
                collapseAggregation: '',
                ids: ["serie01:sum"],
                last: '',
                representationMode: '',
            });
        });

        it('fetches using collapse', () => {
            renderViewPage('/series/?ids=serie01:sum&collapse=year');

            expect(mockApi.fetchSeries).toBeCalledWith({
                collapse: 'year',
                collapseAggregation: '',
                ids: ["serie01:sum"],
                last: '',
                representationMode: '',
            });
        });

        it('fetches using collapse with multiple ids', () => {
            renderViewPage('/series/?ids=serie01:sum,serie02&collapse=year');

            expect(mockApi.fetchSeries).toBeCalledWith({
                collapse: 'year',
                collapseAggregation: '',
                ids: ["serie01:sum", "serie02"],
                last: '',
                representationMode: '',
            });
        });
    });

    it('does not fetch series if no ids were provided in the url', () => {
        renderViewPage('/series/');

        expect(mockApi.fetchSeries).not.toBeCalled();
    });

    it('on Serie picked adds id to ids queryParam', () => {
        const dispatch = jest.fn();
        const unlisten = jest.fn();
        const history = {
            listen: jest.fn().mockImplementation(unlisten),
            push: jest.fn(),
        };
        const wrapper = shallow(
            <UnconnectedViewPage
                series={[]}
                seriesApi={mockApi}
                location={location}
                dispatch={dispatch}
                history={history as any}
                date={{start: '', end: ''}}
            />);

        (wrapper.instance() as UnconnectedViewPage).addPickedSerie(clickEvent, 'serie01');

        expect(history.push).toBeCalledWith('/series/?ids=serie01')
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
            locationMock = { search: "" };
            historyMock = {
                listen: jest.fn(() => unlistenMock),
                push: jest.fn((path: string) => {
                    locationMock.search = '?' + path.split('?')[1]
                }),
            };

            wrapper = shallow(
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

            expect(historyMock.push).toBeCalledWith('/series/?ids=serie01,serie02')
        });

        it('keeps other params untouched', () => {
            historyMock.push('/series/?ids=serie01&other=params');
            (wrapper.instance() as UnconnectedViewPage).addPickedSerie(clickEvent, 'serie02');

            expect(historyMock.push).toBeCalledWith('/series/?ids=serie01,serie02&other=params')
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