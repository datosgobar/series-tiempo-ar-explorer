import { INumberPropsPerId } from "../../../components/viewpage/graphic/Graphic"
import { getTooltipDecimals, DEFAULT_TOOLTIP_DECIMAL_AMOUNT } from "../../../helpers/common/fullSerieID";

describe("Tests for the getTooltipDecimals function", () => {

    let props: INumberPropsPerId;
    let serieOneId: string;
    let serieTwoId: string;
    let serieThreeId: string;
    let significantFigures: number;

    beforeAll(() => {
        serieOneId = "pureSerie";
        serieTwoId = "percentChangeSerie";
        serieThreeId = "anotherSerie";
    })

    describe("Without the significant figures amount specified", () => {

        beforeEach(() => {
            props = {
                'pureSerie': 3,
                'percentChangeSerie': 0
            };
        })

        it('If the series has the amount defined, that is the returned value', () => {
            let amount = getTooltipDecimals(serieOneId, significantFigures, props);
            expect(amount).toEqual(3);
            amount = getTooltipDecimals(serieTwoId, significantFigures, props);
            expect(amount).toEqual(0);
        });
        it('If the series amount is not defined in the props, default value is returned', () => {
            const amount = getTooltipDecimals(serieThreeId, significantFigures, props);
            expect(amount).toEqual(DEFAULT_TOOLTIP_DECIMAL_AMOUNT);
        });
        it('If the props are not defined, then the default value is returned', () => {
            let amount = getTooltipDecimals(serieOneId);
            expect(amount).toEqual(DEFAULT_TOOLTIP_DECIMAL_AMOUNT);
            amount = getTooltipDecimals(serieTwoId);
            expect(amount).toEqual(DEFAULT_TOOLTIP_DECIMAL_AMOUNT);
            amount = getTooltipDecimals(serieThreeId);
            expect(amount).toEqual(DEFAULT_TOOLTIP_DECIMAL_AMOUNT);
        });

    })

    describe("Specifying the significant figures amount", () => {

        beforeAll(() => {
            significantFigures = 4;
        })

        it('If the props are not specified but the significant figures is, then the last is returned', () => {
            const amount = getTooltipDecimals(serieOneId, significantFigures);
            expect(amount).toEqual(4);
        });
        it('If both props and significant figures are specified, the props will prevail', () => {
            props = {
                'pureSerie': 7,
            };
            const amount = getTooltipDecimals(serieOneId, significantFigures, props);
            expect(amount).toEqual(7);
        });
        it('If props are defined but not for a particular serie, then significant figures amount is returned', () => {
            props = {
                'percentChangeSerie': 5,
            };
            const amount = getTooltipDecimals(serieThreeId, significantFigures, props);
            expect(amount).toEqual(4);
        })

    })

})