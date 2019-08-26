import { extractIdsFromUrl, extractUriFromUrl } from "../../../helpers/common/URLExtractors";

describe("Extraction and adjustment of IDs from the URL", () => {

    let url: string;
    let ids: string[];

    it("A URL with only pure IDs returns an array of them as such", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006,99.3_IR_2008_0_9";
        ids = extractIdsFromUrl(url);
        expect(ids[0]).toEqual("defensa_FAA_0006");
        expect(ids[1]).toEqual("99.3_IR_2008_0_9");
    });
    it("Composite IDs are copied as such to the returned array", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=143.3_NO_PR_2004_A_21:percent_change_a_year_ago,116.4_TCRZE_2015_D_36_4&limit=1000";
        ids = extractIdsFromUrl(url);
        expect(ids[0]).toEqual("143.3_NO_PR_2004_A_21:percent_change_a_year_ago");
        expect(ids[1]).toEqual("116.4_TCRZE_2015_D_36_4");
    });
    it("The representationMode query param adjusts the pure IDs", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=148.3_INIVELNAL_DICI_M_26,148.3_INIVELGBA_DICI_M_21&representation_mode=percent_change";
        ids = extractIdsFromUrl(url);
        expect(ids[0]).toEqual("148.3_INIVELNAL_DICI_M_26:percent_change");
        expect(ids[1]).toEqual("148.3_INIVELGBA_DICI_M_21:percent_change");
    });
    it("The representationMode query param does not adjust already composite IDs", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=148.3_INIVELNAL_DICI_M_26:change,148.3_INIVELGBA_DICI_M_21&representation_mode=percent_change";
        ids = extractIdsFromUrl(url);
        expect(ids[0]).toEqual("148.3_INIVELNAL_DICI_M_26:change");
        expect(ids[1]).toEqual("148.3_INIVELGBA_DICI_M_21:percent_change");
    });

})

describe("Extraction of URI from the URL", () => {

    let url: string;
    let uri: string;

    it("A valid endpoint URL returns the URI", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006,99.3_IR_2008_0_9";
        uri = extractUriFromUrl(url);
        expect(uri).toEqual("https://apis.datos.gob.ar/series/api/");
    });
    it("A valid endpoint URL without slash after 'series' works", () => {
        url = "https://apis.datos.gob.ar/series/api/series?ids=defensa_FAA_0006,99.3_IR_2008_0_9";
        uri = extractUriFromUrl(url);
        expect(uri).toEqual("https://apis.datos.gob.ar/series/api/");
    });
    it("A invalid endpoint URL with 'series' returns the uri", () => {
        url = "https://184.47.576/series/?ids=defensa_FAA_0006,99.3_IR_2008_0_9";
        uri = extractUriFromUrl(url);
        expect(uri).toEqual("https://184.47.576/");
    });
    it("A invalid endpoint URL without 'series' returns the same url", () => {
        url = "https://apis.datos.gob.ar/notserie/api/weirdserie?ids=defensa_FAA_0006,99.3_IR_2008_0_9";
        uri = extractUriFromUrl(url);
        expect(uri).toEqual("https://apis.datos.gob.ar/notserie/api/weirdserie?ids=defensa_FAA_0006,99.3_IR_2008_0_9");
    });

})