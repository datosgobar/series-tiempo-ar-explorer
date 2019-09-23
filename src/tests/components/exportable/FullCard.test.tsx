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
            cardOptions={mockCardOptions} />);
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

        it('Renders without crashing', () => {
            expect(wrapper.find(FullCard).exists()).toBe(true);
        });
        it('Renders the border', () => {
            expect(wrapper.find('.card .full').exists()).toBe(true);
        });
        it('Renders a full chart', () => {
            expect(wrapper.find('.card .wide').exists()).toBe(true);
        });
        it('Renders the links footer', () => {
            expect(wrapper.find('div .c-links').exists()).toBe(true);
        });
        it('Renders the tooltips', () => {
            expect(wrapper.find(ReactTooltip).exists()).toBe(true);
        });
        it('Renders the default title header', () => {
            expect(wrapper.find('p .c-title').text()).toContain("EMAE. Base 2004")
        });
        it('Renders the default source', () => {
            expect(wrapper.find('p .c-source').text()).toContain("Fuente: Instituto Nacional de Estadística y Censos (INDEC)");
        });
        it('Renders the default units', () => {
            expect(wrapper.find('p .c-units').text()).toContain("Índice 2004=100");
        });

    })

    describe('Graphic rendering', () => {
        
        it('Renders a small graphic chart', () => {
            mockCardOptions.hasChart = "small";
            mountFullCard();
            expect(wrapper.find('.card .normal').exists()).toBe(true);
        });
        it('Does not render any chart', () => {
            mockCardOptions.hasChart = "none";
            mountFullCard();
            expect(wrapper.find('.card .no-graph').exists()).toBe(true);
        });

    })

    describe('Shown overriden attributes', () => {

        it('Does not render the links footer', () => {
            mockCardOptions.links = "none";
            mountFullCard();
            expect(wrapper.find('div .c-links').exists()).toBe(false);
        });
        it('Does not render the tooltips', () => {
            mockCardOptions.links = "none";
            mountFullCard();
            expect(wrapper.find(ReactTooltip).exists()).toBe(false);
        });
        it('Renders the overriden title header', () => {
            mockCardOptions.title = "Lorem ipsum dolor sit amet";
            mountFullCard();
            expect(wrapper.find('p .c-title').text()).toContain("Lorem ipsum dolor sit amet")
        });
        it('Renders the overriden source', () => {
            mockCardOptions.source = "Lorem ipsum dolor sit amet";
            mountFullCard();
            expect(wrapper.find('p .c-source').text()).toContain("Lorem ipsum dolor sit amet");
        });
        it('Renders the overriden units', () => {
            mockCardOptions.units = "Lorem ipsum dolor sit amet";
            mountFullCard();
            expect(wrapper.find('p .c-units').text()).toContain("Lorem ipsum dolor sit amet");
        });

    })

    describe('Hidden overrideable attributes', () => {
  
        it('Does not render the title header', () => {
            mockCardOptions.title = "";
            mountFullCard();
            expect(wrapper.find('div .c-head').exists()).toBe(false)
        });
        it('Does not render the source', () => {
            mockCardOptions.source = "";
            mountFullCard();
            expect(wrapper.find('p .c-source').exists()).toBe(false);
        });
        it('Does not render the units', () => {
            mockCardOptions.units = "";
            mountFullCard();
            expect(wrapper.find('p .c-units').exists()).toBe(false);
        });

    })

    describe('Decimal handling upon main value', () => {

        it('If decimals are not specified, default amount is used', () => {
            mountFullCard();
            expect(wrapper.find('.c-data p.c-main').text()).toEqual("+151,04");
        });
        it('If decimals are not specified, default amount is used', () => {
            mockCardOptions.decimals = 5;
            mountFullCard();
            expect(wrapper.find('.c-data p.c-main').text()).toEqual("+151,03562");
        });
        it('If specified decimals were negative, default amount is used instead', () => {
            mockCardOptions.decimals = -1;
            mountFullCard();
            expect(wrapper.find('.c-data p.c-main').text()).toEqual("+151,04");
        })

    })

})