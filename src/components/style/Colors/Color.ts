export class Color {
    constructor(public name: string, public code: string){}
}

const Colors = {
    Blue: new Color("blue", "#417798"),
    Brown: new Color("brown","#8e655e"),
    Green1: new Color("green1", "#009488"),
    Green2: new Color("green2", "#898d5d"),
    Magenta: new Color("magenta", "#ef0065"),
    Orange: new Color("orange", "#c96339"),
    Purple: new Color("purple", "#8b5172"),
    Violet: new Color("violet", "#7b52a4"),
};

export default Colors;
