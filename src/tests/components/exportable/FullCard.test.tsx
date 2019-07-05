import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import { ISerie } from "../../../api/Serie";
import FullCard from "../../../components/exportable_card/FullCard";

configure({ adapter: new Adapter() });

describe('FullCard', () => {

    let mockSerie: ISerie;
    let mockCardOptions: any;
    let wrapper: ReactWrapper<any, any>;

    function generateMockSerie() {
        return {
            accrualPeriodicity: "Mensual",
            collapseAggregation: "CollapseAgregation",
            data: [{ date: "2019-03-01", value: 150 },
            { date: "2019-02-01", value: 140 },
            { date: "2019-01-01", value: 180 }],
            datasetSource: "Instituto Nacional de Estadística y Censos (INDEC)",
            datasetTitle: "EMAE",
            description: "EMAE. Base 2004",
            distributionTitle: "EMAE. Base",
            downloadURL: "https://apis.datos.gob.ar/series/api/series?ids=143.3_NO_PR_2004_A_21&last=5000&format=csv",
            endDate: "2019-03-01",
            frequency: "Mensual",
            id: "143.3_NO_PR_2004_A_21",
            isPercentage: false,
            issued: "Issued",
            landingPage: "LandingPage",
            maxValue: 200,
            minValue: 0,
            modified: "Modified",
            publisher: {
                mbox: "Mbox",
                name: "Name"
            },
            representationMode: "RepresentationMode",
            representationModeUnits: "Indice Especial",
            startDate: "2019-01-01",
            themes: [{ id: "1", descripcion: "Tema1", label: "Label1" },
            { id: "2", descripcion: "Tema2", label: "Label2" },
            { id: "3", descripcion: "Tema3", label: "Label3" }],
            timeIndexSize: 3,
            title: "EMAE. Base 2004",
            units: "Índice 2004=100",
        }
    }

    function generateMockCardOptions() {
        return {
            chartType: "line",
            color: "#047FBC",
            explicitSign: true,
            hasChart: "full",
            links: "full",
            locale: "AR",
            source: undefined,
            title: undefined,
            units: undefined
        }
    }

    function mountFullCard() {
        wrapper = mount(<FullCard serie={mockSerie}
            downloadUrl="https://apis.datos.gob.ar/series/api/series?ids=143.3_NO_PR_2004_A_21&last=5000&format=csv"
            laps={3}
            cardOptions={mockCardOptions} />)
    }

    beforeAll(() => {
        mockSerie = generateMockSerie();
    })

    beforeEach(() => {
        mockCardOptions = generateMockCardOptions();
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
            expect(wrapper.find('p .c-units').text()).toContain("Indice Especial");
        });
        it('dropdown begins closed', () => {
            expect(wrapper.find('.btn-group .open').exists()).toBe(false);
        });
        it('opens the dropdown upon clicking it', () => {
            wrapper.find('.btn-group').simulate('click');
            expect(wrapper.find('.btn-group .open').exists()).toBe(true);
        });
        it('closes the open dropdown upon clicking outside it', () => {
            wrapper.find('.btn-group').simulate('click');
            const click = new MouseEvent('click');
            document.dispatchEvent(click);
            expect(wrapper.find('.btn-group .open').exists()).toBe(false);
        });

    })

    describe('Graphic and border rendering', () => {
        
        it('having links but no chart, renders the border', () => {
            mockCardOptions.hasChart = "none";
            mountFullCard();
            expect(wrapper.find('.card .full').exists()).toBe(true);
        });
        it('having chart but no links, renders the border', () => {
            mockCardOptions.links = "none";
            mountFullCard();
            expect(wrapper.find('.card .full').exists()).toBe(true);
        });
        it('having no chart and no links, does not render the border', () => {
            mockCardOptions.hasChart = "none";
            mockCardOptions.links = "none";
            mountFullCard();
            expect(wrapper.find('.card .empty').exists()).toBe(true);
        });
        it('forcedly renders the border', () => {
            mockCardOptions.hasChart = "none";
            mockCardOptions.links = "none";
            mockCardOptions.hasFrame = true;
            mountFullCard();
            expect(wrapper.find('.card .full').exists()).toBe(true);
        });
        it('forcedly does not render the border', () => {
            mockCardOptions.hasFrame = false;
            mountFullCard();
            expect(wrapper.find('.card .empty').exists()).toBe(true);
        });
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