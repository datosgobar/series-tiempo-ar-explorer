import { isValidURL } from "../../../helpers/graphic/URLValidation";

describe("URL Validation for the Graphic exportable component", () => {

    let url: string;

    it("Correct URI root, with the optional slash before query params, is valid", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=143.3_NO_PR_2004_A_21:percent_change_a_year_ago";
        expect(isValidURL(url)).toBe(true);
    });
    it("Correct URI root, without the optional slash before query params, is valid", () => {
        url = "https://apis.datos.gob.ar/series/api/series?ids=143.3_NO_PR_2004_A_21:percent_change_a_year_ago";
        expect(isValidURL(url)).toBe(true);
    });
    it("Wrong URI root is invalid", () => {
        url = "https://datos.gob.ar/api/series?ids=143.3_NO_PR_2004_A_21:percent_change_a_year_ago";
        expect(isValidURL(url)).toBe(false);
    });
    it("Correct URI root with multiple ids is valid", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=143.3_NO_PR_2004_A_21,116.4_TCRZE_2015_D_36_4";
        expect(isValidURL(url)).toBe(true);
    });
    it("Correct URI root, without the ids param, is invalid", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?limit=1000&collapse=month";
        expect(isValidURL(url)).toBe(false);
    });
    it("Correct URI root, with the ids param but without the param starter, is invalid", () => {
        url = "https://apis.datos.gob.ar/series/api/series/ids=143.3_NO_PR_2004_A_21&limit=1000&collapse=month";
        expect(isValidURL(url)).toBe(false);
    });
    it("Correct URI root, with an incomplete param statement, is invalid", () => {
        url = "https://apis.datos.gob.ar/series/api/series/ids=143.3_NO_PR_2004_A_21&limit=&collapse=month";
        expect(isValidURL(url)).toBe(false);
    });
    it("Correct URI root with ids param not first is valid", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?collapse=month&ids=143.3_NO_PR_2004_A_21,116.4_TCRZE_2015_D_36_4&limit=1000";
        expect(isValidURL(url)).toBe(true);
    });

})