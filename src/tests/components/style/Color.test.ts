import { ISerie } from "../../../api/Serie";
import COLORS, { Color, getSerieColor, getColorArray, isHexaColor, getCardColor, DEFAULT_CARD_COLOR } from "../../../components/style/Colors/Color";
import { getFullSerieId } from "../../../helpers/common/fullSerieID";
import { generateCommonMockSerieEMAE, generateCommonMockSerieMotos, generatePercentageMockSerie } from "../../support/mockers/seriesMockers";

describe("Colors", () => {

    describe("Obtainment of the color for a Serie from a list of them", () => {

        let mockSerieOne: ISerie;
        let mockSerieTwo: ISerie;
    
        beforeAll(() => {
            mockSerieOne = generateCommonMockSerieEMAE();
            mockSerieTwo = generateCommonMockSerieMotos();
        });

        it("Single serie returns blue color", () => {
            const series = [mockSerieOne];
            const color = getSerieColor(series, getFullSerieId(mockSerieOne));
            expect(color.name).toEqual("blue1");
        });
    
        it("Same serie id different rep mode returns different colors", () => {
            const emae2 = generatePercentageMockSerie()
            const series = [mockSerieOne, emae2]
            const color = getSerieColor(series, getFullSerieId(series[0]));
            const color2 = getSerieColor(series, getFullSerieId(series[1]));
            expect(color).not.toEqual(color2)
        });
    
        it("Different serie ids return different colors - default colors", () => {
            const series = [mockSerieOne, mockSerieTwo];
            const color = getSerieColor(series, getFullSerieId(series[0]));
            const color2 = getSerieColor(series, getFullSerieId(series[1]));
            expect(color).not.toEqual(color2)
        });
    
        it("Different serie ids return different colors - custom colors", () => {
            const series = [mockSerieOne, mockSerieTwo];
            const colors = [COLORS.a1Blue1, new Color("ColorRaro", "#fffaaf")]
            const color = getSerieColor(series, getFullSerieId(series[0]), colors);
            const color2 = getSerieColor(series, getFullSerieId(series[1]), colors);
            expect(color).not.toEqual(color2)
        });
    
        it("Same serie with same rep mode returns same color - default colors", () => {
            const series = [mockSerieOne, mockSerieOne];
            const color = getSerieColor(series, getFullSerieId(series[0]));
            const color2 = getSerieColor(series, getFullSerieId(series[1]));
            expect(color).toEqual(color2)
        });
    
        it("Same serie with same rep mode returns same color - custom colors", () => {
            const series = [mockSerieOne, mockSerieOne];
            const colors = [COLORS.a1Blue1, new Color("ColorRaro", "#fffaaf")]
            const color = getSerieColor(series, getFullSerieId(series[0]), colors);
            const color2 = getSerieColor(series, getFullSerieId(series[1]), colors);
            expect(color).toEqual(color2)
        });

    })

    describe("Checking if a color is hexadecimal or not", () => {

        let colorString: string;

        it("A string without the '#' is not a hexadecimal color", () => {
            colorString = "FFA254D";
            expect(isHexaColor(colorString)).toBe(false);
        });
        it("A string without non-hexadecimal characters is not a hexadecimal color", () => {
            colorString = "#C0YG25";
            expect(isHexaColor(colorString)).toBe(false);
        });
        it("A string with hexadecimal characters and a '#' is a hexadecimal color", () => {
            colorString = "#82EB04";
            expect(isHexaColor(colorString)).toBe(true);
        });

    })

    describe("Obtainment of Color array", () => {

        it("Create array of colors from string array", () => {
            const colorsString = ["#aaeeff", "#f2fe05", "#06f140"]
            const colors = getColorArray(colorsString)
            expect(colors).toBeDefined()
            if (colors !== undefined) {
                expect(colors.map(color => color.code)).toEqual(colorsString)
                expect(colors.map(color => color.name)).toEqual(colorsString)
            }
        });
    
        it("Create array of colors from a undefined string array returns the default colors", () => {
            const colorsString = undefined
            const colors = getColorArray(colorsString)
            expect(colors).toEqual((Object as any).values(COLORS))
        });
    
        it("Create array of colors from index array", () => {
            const colorsString = ["3", "4", "9"]
            const colors = getColorArray(colorsString)
            expect(colors).toBeDefined()
            if (colors !== undefined) {
                const expectedColors = [
                    new Color("orange", "#F9A822"),
                    new Color("violet", "#6A1B99"),
                    new Color("blue1", "#0072BB")
                ]
                expect(colors).toEqual(expectedColors)
            }
        });
    
        it("Create array of colors from an array of hexas and indexes", () => {
            const colorsString = ["3", "#f2fe05", "9"]
            const colors = getColorArray(colorsString)
            expect(colors).toBeDefined()
            if (colors !== undefined) {
                const expectedColors = [
                    new Color("orange", "#F9A822"),
                    new Color("#f2fe05", "#f2fe05"),
                    new Color("blue1", "#0072BB")
                ]
                expect(colors).toEqual(expectedColors)
            }
        });
    
        it("Create array of colors from an array of indexes out of range", () => {
            const colorsString = ["1015", "11", "42"]
            const colors = getColorArray(colorsString)
            expect(colors).toBeDefined()
            if (colors !== undefined) {
                const expectedColors = [
                    new Color("blue2", "#039BE5"),
                    new Color("red1", "#C62828"),
                    new Color("red2", "#C2185B")
                ]
                expect(colors).toEqual(expectedColors)
            }
        });

    })

    describe("Obtainment of the color for a Card component", () => {

        let colorArgument: string | number;
        let cardColor: string;

        it("If no argument is specified, the default color is returned", () => {
            cardColor = getCardColor();
            expect(cardColor).toEqual(DEFAULT_CARD_COLOR);
        });
        it("If a hexa color code is specified, such is returned", () => {
            colorArgument = "#F2E455";
            cardColor = getCardColor(colorArgument);
            expect(cardColor).toEqual(colorArgument);
        });
        it("A numerical alias is mapped to its default palette index", () => {
            colorArgument = 4;
            cardColor = getCardColor(colorArgument);
            expect(cardColor).toEqual("#6A1B99");
        });
        it("If numerical alias is bigger than 8, its 9-modulus is mapped", () => {
            colorArgument = 16;
            cardColor = getCardColor(colorArgument);
            expect(cardColor).toEqual("#039BE5");
        });


    })

});
