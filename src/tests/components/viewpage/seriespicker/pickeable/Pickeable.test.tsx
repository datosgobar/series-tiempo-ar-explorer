import * as React from "react";

import { configure, mount } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';

import Pickeable from "../../../../../components/viewpage/seriespicker/pickeable/Pickeable";


configure({adapter: new Adapter()});


describe('Pickeable', () => {

    it('calls onPick(value) when clicked', () => {

        const value = 1;
        const onPick = jest.fn();

        const wrapper = mount(<Pickeable value={value} onPick={onPick}/>);

        wrapper.find(".Pickeable").simulate("click");

        expect(onPick).toBeCalledWith(value);
    });
});