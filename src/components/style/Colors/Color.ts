import { ISerie } from "../../../api/Serie";
import { getFullSerieId } from "../../../helpers/common/fullSerieID";

export class Color {
    constructor(public name: string, public code: string){}
}

// "a<number>" is because order is important
const COLORS = {
    a1Blue1: new Color("blue1", "#0072BB"),
    a2Green1: new Color("green1","#2E7D33"),
    a3Red1: new Color("red1", "#C62828"),
    a4Orange: new Color("orange", "#F9A822"),
    a5Violet: new Color("violet", "#6A1B99"),
    a6Pink: new Color("pink", "#EC407A"),
    a7Red2: new Color("red2", "#C2185B"),
    a8Blue2: new Color("blue2", "#039BE5"),
    a9Green2: new Color("green2", "#6EA100"),
};

const hexaColorRegex = /^#[0-9a-f]{6}$/i;

export const DEFAULT_CARD_COLOR = "#0072BB";
const DEFAULT_COLORS = (Object as any).values(COLORS);

export default COLORS;

export function getColorBySerieId(series: ISerie[], serieId: string): string {
    return getSerieColor(series, serieId).code;
}

export function getSerieColor(series: ISerie[], fullSerieId: string, colors?: Color[]): Color {

    const finalColors = colors === undefined ? DEFAULT_COLORS : colors;
    const index = series.findIndex(viewSerie => getFullSerieId(viewSerie) === fullSerieId) % finalColors.length;
    return finalColors[index];

}

export function isHexaColor(color: string): boolean {
    return hexaColorRegex.test(color)
}

export function getColorArray(colors?: string[]): Color[] {

    if (colors === undefined) {
        return DEFAULT_COLORS;
    }

    return colors.map((color): Color => {
        if (isHexaColor(color)) {
            return new Color(color, color)
        } else {
            const index = +color % DEFAULT_COLORS.length;
            return DEFAULT_COLORS[index];
        }
    });

}

export function getCardColor(color?: string | number): string {

    if (color === undefined) {
        return DEFAULT_CARD_COLOR;
    }

    const colorString = color.toString();
    if (isHexaColor(colorString)) {
        return colorString;
    }

    const index = +color % DEFAULT_COLORS.length;
    return DEFAULT_COLORS[index].code;

}
