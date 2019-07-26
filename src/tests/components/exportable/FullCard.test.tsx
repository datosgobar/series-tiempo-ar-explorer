import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import { ISerie } from "../../../api/Serie";
import FullCard from "../../../components/exportable_card/FullCard";
import { generateCommonMockSerieEMAE } from "../../support/mockers/seriesMockers";
import { generateCommonMockCardOptions } from "../../support/mockers/cardMockers";

configure({ adapter: new Adapter() });

describe('FullCard', () => {

    let mockSerie: ISerie;
    let mockCardOptions: any;
    let wrapper: ReactWrapper<any, any>;

    function mountFullCard() {
        wrapper = mount(<FullCard serie={mockSerie}
            downloadUrl="https://apis.datos.gob.ar/series/api/series?ids=143.3_NO_PR_2004_A_21&last=5000&format=csv"
            laps={3}
            cardOptions={mockCardOptions} />)
    }

    beforeAll(() => {
        mockSerie = generateCommonMockSerieEMAE();
    })

    beforeEach(() => {
        mockCardOptions = generateCommonMockCardOptions();
    })

    describe('Shown default attributes', () => {

        beforeEach(() => {
            mountFullCard();
        })

        it('renders without crashing', () => {
            expect(wrapper.find(FullCard).exists()).toBe(true);
        });
        it('renders the border', () => {
            expect(wrapper.find('.card .full').exists()).toBe(true);
        });
        it('renders a full chart', () => {
            expect(wrapper.find('.card .wide').exists()).toBe(true);
        });
        it('renders the links footer', () => {
            expect(wrapper.find('div .c-links').exists()).toBe(true);
        });
        it('renders the tooltips', () => {
            expect(wrapper.find(ReactTooltip).exists()).toBe(true);
        });
        it('renders the default title header', () => {
            expect(wrapper.find('p .c-title').text()).toContain("EMAE. Base 2004")
        });
        it('renders the default source', () => {
            expect(wrapper.find('p .c-source').text()).toContain("Fuente: Instituto Nacional de Estadística y Censos (INDEC)");
        });
        it('renders the default units', () => {
            expect(wrapper.find('p .c-units').text()).toContain("Índice 2004=100");
        });

    })

    describe('Graphic rendering', () => {
        
        it('renders a small graphic chart', () => {
            mockCardOptions.hasChart = "small";
            mountFullCard();
            expect(wrapper.find('.card .normal').exists()).toBe(true);
        });
        it('does not render any chart', () => {
            mockCardOptions.hasChart = "none";
            mountFullCard();
            expect(wrapper.find('.card .no-graph').exists()).toBe(true);
        });

    })

    describe('Shown overriden attributes', () => {

        it('does not render the links footer', () => {
            mockCardOptions.links = "none";
            mountFullCard();
            expect(wrapper.find('div .c-links').exists()).toBe(false);
        });
        it('does not render the tooltips', () => {
            mockCardOptions.links = "none";
            mountFullCard();
            expect(wrapper.find(ReactTooltip).exists()).toBe(false);
        });
        it('renders the overriden title header', () => {
            mockCardOptions.title = "Lorem ipsum dolor sit amet";
            mountFullCard();
            expect(wrapper.find('p .c-title').text()).toContain("Lorem ipsum dolor sit amet")
        });
        it('renders the overriden source', () => {
            mockCardOptions.source = "Lorem ipsum dolor sit amet";
            mountFullCard();
            expect(wrapper.find('p .c-source').text()).toContain("Lorem ipsum dolor sit amet");
        });
        it('renders the overriden units', () => {
            mockCardOptions.units = "Lorem ipsum dolor sit amet";
            mountFullCard();
            expect(wrapper.find('p .c-units').text()).toContain("Lorem ipsum dolor sit amet");
        });

    })

    describe('Hidden overrideable attributes', () => {
  
        it('does not render the title header', () => {
            mockCardOptions.title = "";
            mountFullCard();
            expect(wrapper.find('div .c-head').exists()).toBe(false)
        });
        it('does not render the source', () => {
            mockCardOptions.source = "";
            mountFullCard();
            expect(wrapper.find('p .c-source').exists()).toBe(false);
        });
        it('does not render the units', () => {
            mockCardOptions.units = "";
            mountFullCard();
            expect(wrapper.find('p .c-units').exists()).toBe(false);
        });

    })

})