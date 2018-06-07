import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from "react";

import MockApi from "../../../../api/mockApi";

import { ISerieApi } from "../../../../../api/SerieApi";
import { FilterThemes } from "../../../../../components/searchpage/filters/filterthemes/FilterThemes";


configure({ adapter: new Adapter() });

describe('FilterThemes', () => {

    const themes = ['theme1', 'theme2', 'theme3'];
    const themesP = Promise.resolve(themes);

    let seriesApi: ISerieApi;
    let onThemePicked: (event: React.MouseEvent<HTMLLIElement>, theme: string) => void;
    const mouseEvent = expect.anything();

    let wrapper: ReactWrapper;

    beforeEach(() => {

        seriesApi = new MockApi(0);
        seriesApi.fetchThemes = jest.fn(() => themesP);

        onThemePicked = jest.fn();

        wrapper = mount(
            <FilterThemes
                seriesApi={seriesApi}
                picked=""
                onThemePicked={onThemePicked} />
        );
    });

    it('fetches themes upon render', () => {

        expect(seriesApi.fetchThemes).toBeCalled();
    });

    it('renders a list with all the themes', () => {

        return themesP.then(() => {
            wrapper.update();
            expect(wrapper.find(FilterThemes).find('.Item').length).toBe(themes.length);
        });
    });

    themes.forEach((theme, index) => {
        it('calls onThemePicked(event, themeId) when a theme is clicked', () => {

            return themesP.then(() => {
                wrapper.update();

                wrapper.find(FilterThemes).find('.Item').at(index).find('input').simulate('change', { target: { checked: true } });

                expect(onThemePicked).toBeCalledWith(mouseEvent, theme);
            });
        });

        it('calls onThemePicked(event, null) when selected theme is deselected', () => {
    
            return themesP.then(() => {
                wrapper.update();
    
                wrapper.find(FilterThemes).find('.Item').at(index).find('input').simulate('change', { target: { checked: false } });
    
                expect(onThemePicked).toBeCalledWith(mouseEvent, null);
            });
        })
    });    
});