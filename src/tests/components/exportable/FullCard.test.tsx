import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
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
            datasetSource: "EMAE",
            datasetTitle: "EMAE",
            description: "Descripcion",
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
            representationModeUnits: "RepresentationModeUnits",
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
            sourceOverride: undefined,
            titleOverride: undefined,
            unitsOverride: undefined
        }
    }

    describe('Shown overrideable attributes', () => {

        beforeAll(() => {
            mockSerie = generateMockSerie();
            mockCardOptions = generateMockCardOptions();
            wrapper = mount(<FullCard serie={mockSerie}
                downloadUrl="https://apis.datos.gob.ar/series/api/series?ids=143.3_NO_PR_2004_A_21&last=5000&format=csv"
                laps={3}
                cardOptions={mockCardOptions} />);
        })

        it('renders without crashing', () => {
            expect(wrapper.find(FullCard).exists()).toBe(true);
        });
        it('renders the title header', () => {
            expect(wrapper.find('div .c-head').exists()).toBe(true)
        })
        it('renders the source', () => {
            expect(wrapper.find('p .c-span').exists()).toBe(true);
        })
        it('renders the units', () => {
            expect(wrapper.find('p .c-main-title').exists()).toBe(true);
        })

    })

    describe('Hidden overrideable attributes', () => {

        beforeAll(() => {
            mockSerie = generateMockSerie();
            mockCardOptions = generateMockCardOptions();
            mockCardOptions.sourceOverride = ""
            mockCardOptions.titleOverride = ""
            mockCardOptions.unitsOverride = ""
            wrapper = mount(<FullCard serie={mockSerie}
                downloadUrl="https://apis.datos.gob.ar/series/api/series?ids=143.3_NO_PR_2004_A_21&last=5000&format=csv"
                laps={3}
                cardOptions={mockCardOptions} />);
        })
    
        it('does not render the title header', () => {
            expect(wrapper.find('div .c-head').exists()).toBe(false)
        })
        it('does not render the source', () => {
            expect(wrapper.find('p .c-span').exists()).toBe(false);
        })
        it('does not render the units', () => {
            expect(wrapper.find('p .c-main-title').exists()).toBe(false);
        })

    })

})