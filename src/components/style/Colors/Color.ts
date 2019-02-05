export class Color {
    constructor(public name: string, public code: string){}
}

const Colors = {
    Blue1: new Color("blue1", "#0072BB"),
    Blue2: new Color("blue2", "#039BE5"),
    Green1: new Color("green1","#2E7D33"),
    Green2: new Color("green2", "#6EA100"),
    Orange: new Color("orange", "#F9A822"),
    Pink: new Color("pink", "#EC407A"),
    Purple: new Color("purple", "#C2185B"),
    Red: new Color("red", "#C62828"),
    Violet1: new Color("violet1", "#6A1B99"),
    Violet2: new Color("violet2", "#6A1B99"),
};
export const NaC = new Color("", "");

export default Colors;
