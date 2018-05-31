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
import ViewPage from '../../../components/viewpage/ViewPage';
import configureStore from '../../../store/configureStore';


configure({ adapter: new Adapter() });

describe('ViewPage', () => {

    let mockApi: ISerieApi;
    let store: Store;

    beforeEach(() => {
        mockApi = new MockApi(0);
        mockApi.getSeries = jest.fn(mockApi.getSeries);

        store = configureStore();
        store.dispatch(setSeriesApi(mockApi))
    });

    function renderViewPage(url: string){
        return mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[url]} initialIndex={0}>
                    <ViewPage />
                </MemoryRouter>
            </Provider>);
    }

    it('renders without crashing', () => {

        const wrapper = renderViewPage('/view/?ids=serie01');

        expect(wrapper.find('.ViewPage').exists()).toBe(true);
    });

    it('fetchs series on the url upon render', () => {

        renderViewPage('/view/?ids=serie01');

        expect(mockApi.getSeries).toBeCalledWith(["serie01"]);
    });

    it('does not fetchs series if no ids were provided in the url', () => {

        renderViewPage('/view/');

        expect(mockApi.getSeries).not.toBeCalled();
    });
});