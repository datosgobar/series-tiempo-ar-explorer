import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import FullCardContainer, { IFullCardContainerProps } from '../../../components/style/exportable_card/FullCardContainer';

configure({ adapter: new Adapter() });

describe('FullCardDropdownContainer', () => {

    let wrapper: ShallowWrapper<any, any>;
    let props: IFullCardContainerProps;

    describe('Non-minimal Card with links and chart', () => {

        beforeEach(() => {
            props = {
                color: "#EC407A",
                hasChart: "small",
                links: "small"
            };
            wrapper = shallow(<FullCardContainer {...props}/>);
        })
        
        it('renders the frame', () => {
            expect(wrapper.find('.card').hasClass('full')).toBe(true);
        });
        it('renders the color bar', () => {
            expect(wrapper.find('.card').prop('style')).toHaveProperty('borderTop', '5px solid #EC407A');
        });
        it('forcedly does not render the frame', () => {
            props.hasFrame = false;
            wrapper = shallow(<FullCardContainer {...props}/>);
            expect(wrapper.find('.card').hasClass('empty')).toBe(true);
        });
        it('forcedly does not render the color bar', () => {
            props.hasColorBar = false;
            wrapper = shallow(<FullCardContainer {...props}/>);
            expect(wrapper.find('.card').prop('style')).toHaveProperty('borderTop', '');
        });

    })

    describe('Non-minimal card with and without links or chart', () => {
        
        beforeEach(() => {
            props = {
                color: "#EC407A",
                hasChart: "small",
                links: "small"
            };
        })
        
        it('having links but no chart, renders the frame', () => {
            props.hasChart = "none";
            wrapper = shallow(<FullCardContainer {...props}/>)
            expect(wrapper.find('.card').hasClass('full')).toBe(true);
        });
        it('having chart but no links, renders the frame', () => {
            props.links = "none";
            wrapper = shallow(<FullCardContainer {...props}/>)
            expect(wrapper.find('.card').hasClass('full')).toBe(true);
        });

    })

    describe('Default minimal card with no links nor chart', () => {
        
        beforeEach(() => {
            props = {
                color: "#EC407A",
                hasChart: "none",
                links: "none"
            };
        })
        
        it('having no chart and no links, does not render the frame', () => {
            wrapper = shallow(<FullCardContainer {...props}/>)
            expect(wrapper.find('.card').hasClass('empty')).toBe(true);
        });
        it('forcedly renders the frame', () => {
            props.hasFrame = true;
            wrapper = shallow(<FullCardContainer {...props}/>)
            expect(wrapper.find('.card').hasClass('full')).toBe(true);
        });
        it('forcedly renders the frame', () => {
            props.hasColorBar = true;
            wrapper = shallow(<FullCardContainer {...props}/>)
            expect(wrapper.find('.card').prop('style')).toHaveProperty('borderTop', '5px solid #EC407A');
        });

    })

})