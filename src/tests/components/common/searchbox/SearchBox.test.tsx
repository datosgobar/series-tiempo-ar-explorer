import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { SearchBox } from '../../../../components/common/searchbox/SearchBox';
import configureStore from '../../../../store/configureStore';

import { configure, mount } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });


describe('searchbox', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = configureStore();
    ReactDOM.render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchBox />
        </Provider>
      </MemoryRouter>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('redirects to search page when submited', () => {

    const historyMock = {
      push: jest.fn()
    };

    const wrapper = mount(<SearchBox history={historyMock}/>);

    wrapper.find('.SearchBox').find('input').last().simulate('click');

    expect(historyMock.push).toBeCalledWith('/search/');
  });

  it('redirects to search page when submited with searchterm', () => {

    const searchTerm = 'searchTerm'

    const historyMock = {
      push: jest.fn()
    };

    const wrapper = mount(<SearchBox history={historyMock}/>);

    wrapper.find('.SearchBox').find('input').first().simulate('change', { target: { value: searchTerm } });

    wrapper.find('.SearchBox').find('input').last().simulate('click');

    expect(historyMock.push).toBeCalledWith('/search/' + searchTerm);
  });
});