import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import FullCardContainer, { IFullCardContainerProps } from '../../../components/style/exportable_card/FullCardContainer';

configure({ adapter: new Adapter() });

describe('FullCardContainer', () => {

    let wrapper: ShallowWrapper<any, any>;
    let props: IFullCardContainerProps;

    function mountComponent() {
        wrapper = shallow<FullCardContainer>(
            <FullCardContainer
                color={props.color}
                hasChart={props.hasChart}
                hasColorBar={props.hasColorBar}
                hasFrame={props.hasFrame}
                links={props.links}
                serieId={props.serieId} />);
    }

    describe('Non-minimal Card with links and chart', () => {

        beforeEach(() => {
            props = {
                color: "#EC407A",
                hasChart: "small",
                hasColorBar: undefined,
                hasFrame: undefined,
                links: "small",
                serieId: "143.3_NO_PR_2004_A_21"
            };
            mountComponent();
        })

        it('renders the frame', () => {
            expect(wrapper.find('.card').hasClass('full')).toBe(true);
        });
        it('renders the color bar', () => {
            expect(wrapper.find('.card').prop('style')).toHaveProperty('borderTop', '5px solid #EC407A');
        });
        it('forcedly does not render the frame', () => {
            props.hasFrame = false;
            mountComponent();
            expect(wrapper.find('.card').hasClass('empty')).toBe(true);
        });
        it('forcedly does not render the color bar', () => {
            props.hasColorBar = false;
            mountComponent();
            expect(wrapper.find('.card').prop('style')).toHaveProperty('borderTop', '');
        });

    })

    describe('Non-minimal card with and without links or chart', () => {

        beforeEach(() => {
            props = {
                color: "#EC407A",
                hasChart: "small",
                hasColorBar: undefined,
                hasFrame: undefined,
                links: "small",
                serieId: "143.3_NO_PR_2004_A_21"
            };
        })

        it('having links but no chart, renders the frame', () => {
            props.hasChart = "none";
            mountComponent();
            expect(wrapper.find('.card').hasClass('full')).toBe(true);
        });
        it('having chart but no links, renders the frame', () => {
            props.links = "none";
            mountComponent();
            expect(wrapper.find('.card').hasClass('full')).toBe(true);
        });
        it('having frame but no links, it is clickable', () => {
            props.links = 'none';
            window.open = jest.fn();
            const spy = jest.spyOn(FullCardContainer.prototype, "openViewMore");
            mountComponent();
            wrapper.simulate('click');
            expect(spy).toHaveBeenCalledTimes(1);
            jest.clearAllMocks();
        });
        it('having frame and links, it is not clickable', () => {
            props.hasFrame = false;
            window.open = jest.fn();
            const spy = jest.spyOn(FullCardContainer.prototype, "openViewMore");
            mountComponent();
            wrapper.simulate('click');
            expect(spy).toHaveBeenCalledTimes(0);
            jest.clearAllMocks();
        });

    })

    describe('Default minimal card with no links nor chart', () => {

        beforeEach(() => {
            props = {
                color: "#EC407A",
                hasChart: "none",
                hasColorBar: undefined,
                hasFrame: undefined,
                links: "none",
                serieId: "143.3_NO_PR_2004_A_21"
            };
        })

        it('having no chart and no links, does not render the frame', () => {
            mountComponent();
            expect(wrapper.find('.card').hasClass('empty')).toBe(true);
        });
        it('forcedly renders the frame', () => {
            props.hasFrame = true;
            mountComponent();
            expect(wrapper.find('.card').hasClass('full')).toBe(true);
        });
        it('forcedly renders the color bar', () => {
            props.hasColorBar = true;
            mountComponent();
            expect(wrapper.find('.card').prop('style')).toHaveProperty('borderTop', '5px solid #EC407A');
        });

    })

})