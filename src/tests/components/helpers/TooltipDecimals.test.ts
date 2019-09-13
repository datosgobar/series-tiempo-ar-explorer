import { INumberPropsPerId } from "../../../components/viewpage/graphic/Graphic"
import { getTooltipDecimals, DEFAULT_TOOLTIP_DECIMAL_AMOUNT } from "../../../helpers/common/fullSerieID";

describe("Tests for the getTooltipDecimals function", () => {

    let props: INumberPropsPerId;
    let serieOneId: string;
    let serieTwoId: string;
    let serieThreeId: string;

    beforeAll(() => {

        serieOneId = "pureSerie";
        serieTwoId = "percentChangeSerie";
        serieThreeId = "anotherSerie";
    })

    beforeEach(() => {
        props = {
            'pureSerie': 3,
            'percentChangeSerie': 0
        };

    })

    it('If the series has the amount defined, that is the returned value', () => {
        let amount = getTooltipDecimals(serieOneId, props);
        expect(amount).toEqual(3);
        amount = getTooltipDecimals(serieTwoId, props);
        expect(amount).toEqual(0);
    })
    it('If the series amount is not defined in the props, default value is returned', () => {
        const amount = getTooltipDecimals(serieThreeId, props);
        expect(amount).toEqual(DEFAULT_TOOLTIP_DECIMAL_AMOUNT);
    })
    it('If the props are not defined, then the default value is returned', () => {
        props = {};
        let amount = getTooltipDecimals(serieOneId, props);
        expect(amount).toEqual(DEFAULT_TOOLTIP_DECIMAL_AMOUNT);
        amount = getTooltipDecimals(serieTwoId, props);
        expect(amount).toEqual(DEFAULT_TOOLTIP_DECIMAL_AMOUNT);
        amount = getTooltipDecimals(serieThreeId, props);
        expect(amount).toEqual(DEFAULT_TOOLTIP_DECIMAL_AMOUNT);
    })

})