import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import FullCardDropdownContainer from '../../../components/style/exportable_card/FullCardDropdownContainer';
import LinkShareItem from '../../../components/style/Share/LinkShareItem';

configure({ adapter: new Adapter() });

describe('FullCardDropdownContainer', () => {

    let wrapper: ShallowWrapper<any, any>;

    beforeEach(() => {
        wrapper = shallow(
            <FullCardDropdownContainer text="Enlaces">
                <LinkShareItem url="web.url" text="Enlace web" />
                <LinkShareItem url="csv.url" text="Enlace CSV" />
                <LinkShareItem url="json.url" text="Enlace JSON" />
            </FullCardDropdownContainer>);
    })

    it('dropdown begins closed', () => {
        expect(wrapper.instance().state.open).toBe(false);
    });
    it('opens the dropdown upon clicking it', () => {
        wrapper.find('.c-dropdown').simulate('click');
        expect(wrapper.instance().state.open).toBe(true);
    });
    it('closes the open dropdown upon clicking it again', () => {
        wrapper.find('.c-dropdown').simulate('click');
        wrapper.find('.c-dropdown').simulate('click');
        expect(wrapper.instance().state.open).toBe(false);
    });
    it('closes the open dropdown upon clicking outside it', () => {
        wrapper.find('.c-dropdown').simulate('click');
        const click = new MouseEvent('click');
        document.dispatchEvent(click);
        expect(wrapper.instance().state.open).toBe(false);
    });

})