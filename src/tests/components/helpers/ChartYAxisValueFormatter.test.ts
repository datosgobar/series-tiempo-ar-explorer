import { formatValue } from "../../../components/viewpage/graphic/formatterForSerie";

it("Formats a value with AR locale with a comma", () => {
    const formatted = formatValue(0.1, 'AR')
    expect(formatted).toBe('10,00%')
});

it("Formats a value with US locale with a dot", () => {
    const formatted = formatValue(0.1, 'US')
    expect(formatted).toBe('10.00%')
});