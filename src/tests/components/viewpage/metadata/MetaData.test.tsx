import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from "redux";
import MetaData from '../../../../components/viewpage/metadata/MetaData';
import configureStore from "../../../../store/configureStore";


configure({ adapter: new Adapter() });

let store: Store;
store = configureStore();

it('renders without crashing', () => {
    const onRemove = jest.fn();
    const wrapper = mount(
        <Provider store={store}>
            <MetaData onRemove={onRemove} />
        </Provider>
    );

    expect(wrapper.find('.MetaData').exists()).toBe(true);
});
