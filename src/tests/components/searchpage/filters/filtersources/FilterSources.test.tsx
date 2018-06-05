import { configure, mount, shallow } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from "react";

import MockApi from "../../../../api/mockApi";

import { ISerieApi } from "../../../../../api/SerieApi";
import { FilterSources } from "../../../../../components/searchpage/filters/filtersources/FilterSources";


configure({ adapter: new Adapter() });

describe('FilterSources', () => {

    const sources = ['source1', 'source2', 'source3'];
    const sourcesP = Promise.resolve(sources);

    let seriesApi: ISerieApi;
    let onSourcePicked: (event: React.MouseEvent<HTMLLIElement>, source: string) => void;
    const mouseEvent = expect.anything();

    beforeEach(() => {

        seriesApi = new MockApi(0);
        seriesApi.fetchSources = jest.fn(() => sourcesP);

        onSourcePicked = jest.fn();
    });

    it('fetches sources upon render', () => {

        shallow(
            <FilterSources
                seriesApi={seriesApi}
                picked=""
                onSourcePicked={onSourcePicked} />
        );

        expect(seriesApi.fetchSources).toBeCalled();
    });

    it('renders a list with all the sources', () => {

        const wrapper = mount(
            <FilterSources
                seriesApi={seriesApi}
                picked=""
                onSourcePicked={onSourcePicked} />
        );

        return sourcesP.then(() => {
            wrapper.update();
            expect(wrapper.find('.Source').length).toBe(sources.length);
        });
    });

    sources.forEach((source, index) => {
        it('calls onSourcePicked(event, sourceId) when a source is clicked', () => {

            const wrapper = mount(
                <FilterSources
                    seriesApi={seriesApi}
                    picked=""
                    onSourcePicked={onSourcePicked} />
            );

            return sourcesP.then(() => {
                wrapper.update();

                wrapper.find('.Source').at(index).find('input').simulate('change');

                expect(onSourcePicked).toBeCalledWith(mouseEvent, source);
            });
        });
    });
});