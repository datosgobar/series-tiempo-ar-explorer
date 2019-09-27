import { DEFAULT_SIGNIFICANT_FIGURES, MAX_SIGNIFICANT_FIGURES } from "../../../api/Serie";
import { INumberPropsPerId } from "../../../components/viewpage/graphic/Graphic";
import { getTooltipDecimals, getMaxDecimalsAmount } from "../../../helpers/common/decimalsAmountHandling";

describe("Tests for determination of the maximum cap of decimals amount", () => {
    
    let maxDecimalsProp: number;
    let maximumCap: number;

    it("If a maxDecimals prop is not specified, the default maximum is returned", () => {
        maximumCap = getMaxDecimalsAmount(maxDecimalsProp);
        expect(maximumCap).toEqual(MAX_SIGNIFICANT_FIGURES);
    });
    it("If a maxDecimals prop is specified and not negative, such is returned", () => {
        maxDecimalsProp = 0;
        maximumCap = getMaxDecimalsAmount(maxDecimalsProp);
        expect(maximumCap).toEqual(0);
    });
    it("If a maxDecimals prop is specified but negative, the default maximum is returned", () => {
        maxDecimalsProp = -4;
        maximumCap = getMaxDecimalsAmount(maxDecimalsProp);
        expect(maximumCap).toEqual(MAX_SIGNIFICANT_FIGURES);
    });

})

describe("Tests for the getTooltipDecimals function, to obtain the decimal amount for the tooltip of a serie at the Graphic", () => {

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
            expect(amount).toEqual(DEFAULT_SIGNIFICANT_FIGURES);
        });
        it('If the props are not defined, then the default value is returned', () => {
            let amount = getTooltipDecimals(serieOneId);
            expect(amount).toEqual(DEFAULT_SIGNIFICANT_FIGURES);
            amount = getTooltipDecimals(serieTwoId);
            expect(amount).toEqual(DEFAULT_SIGNIFICANT_FIGURES);
            amount = getTooltipDecimals(serieThreeId);
            expect(amount).toEqual(DEFAULT_SIGNIFICANT_FIGURES);
        });

    })

    describe("Specifying the significant figures amount", () => {

        beforeAll(() => {
            significantFigures = 1;
        })

        it('If the props are not specified but the significant figures amount is, then the last is returned', () => {
            const amount = getTooltipDecimals(serieOneId, significantFigures);
            expect(amount).toEqual(1);
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
            expect(amount).toEqual(1);
        });

    })

})