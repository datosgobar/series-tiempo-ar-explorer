export default function randomColor() {
    // tslint:disable-next-line:no-bitwise
    return "#" + ((1 << 24) * Math.random() | 0).toString(16)
}