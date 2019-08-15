import { ISerie } from "../../../api/Serie";
import { getFullSerieId } from "../../viewpage/graphic/Graphic";

export class Color {
    constructor(public name: string, public code: string){}
}

// "a<number>" is because order is important
const Colors = {
    a1Blue1: new Color("blue1", "#0072BB"),
    a2Green1: new Color("green1","#2E7D33"),
    a3Red: new Color("red", "#C62828"),
    a4Orange: new Color("orange", "#F9A822"),
    a5Violet: new Color("violet", "#6A1B99"),
    a6Pink: new Color("pink", "#EC407A"),
    a7Purple: new Color("purple", "#C2185B"),
    a8Blue2: new Color("blue2", "#039BE5"),
    a9Green2: new Color("green2", "#6EA100"),
};

export default Colors;

export function getColorBySerieId(series: ISerie[], serieId: string): string {
    return colorFor(series, serieId).code;
}

export function colorFor(series: ISerie[], fullSerieId: string, colors?: Color[]): Color {
    const finalColors = colors === undefined ? (Object as any).values(Colors) : colors;
    const index = series.findIndex(viewSerie => getFullSerieId(viewSerie) === fullSerieId) % finalColors.length;

    return finalColors[index];
}

export function getColorArray(colors?: string[]): Color[] {
    if (colors === undefined) {
        return (Object as any).values(Colors)
    }
    return colors.map(colorString => new Color(colorString, colorString))
}
