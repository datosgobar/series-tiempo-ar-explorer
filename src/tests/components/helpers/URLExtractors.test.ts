import { extractUriFromUrl, getDateFromUrl, IDsExtractor, getRepresentationModeFromUrl, DEFAULT_REPRESENTATION_MODE, getUpdatedRepModeURL, ICollapseParams, getCollapseParamsFromUrl } from "../../../helpers/common/URLExtractors";
import { IDateRange } from "../../../api/DateSerie";

describe("Extraction and modifying of IDs from the URL", () => {

    let url: string;
    let extractor: IDsExtractor;
    let ids: string[];

    describe("Simple extraction of IDs from the 'ids' param of the URL", () => {

        it("Only the 'ids' query param matters when extracting the IDs", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006:percent_change,99.3_IR_2008_0_9&representation_mode=change";
            extractor = new IDsExtractor(url);
            ids = extractor.getIDsAsTheyAre();
            expect(ids[0]).toEqual("defensa_FAA_0006:percent_change");
            expect(ids[1]).toEqual("99.3_IR_2008_0_9");
        });
        it("If there is no 'ids' query param, an empty list is returned", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?metadata=full";
            extractor = new IDsExtractor(url);
            ids = extractor.getIDsAsTheyAre();
            expect(ids.length).toBe(0);
        })

    })

    describe("Extraction of IDs taking into account implicit unit modifiers", () => {
    
        it("A URL with only pure IDs and no 'representation_mode' query param does not modify any ID", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006,99.3_IR_2008_0_9";
            extractor = new IDsExtractor(url);
            ids = extractor.getModifiedIDs();
            expect(ids[0]).toEqual("defensa_FAA_0006");
            expect(ids[1]).toEqual("99.3_IR_2008_0_9");
        });
        it("Explicitly modified IDs are copied as such to the returned array", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=143.3_NO_PR_2004_A_21:percent_change_a_year_ago,116.4_TCRZE_2015_D_36_4&limit=1000";
            extractor = new IDsExtractor(url);
            ids = extractor.getModifiedIDs();
            expect(ids[0]).toEqual("143.3_NO_PR_2004_A_21:percent_change_a_year_ago");
            expect(ids[1]).toEqual("116.4_TCRZE_2015_D_36_4");
        });
        it("The 'representation_mode' query param modifies the pure IDs", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=148.3_INIVELNAL_DICI_M_26,148.3_INIVELGBA_DICI_M_21&representation_mode=percent_change";
            extractor = new IDsExtractor(url);
            ids = extractor.getModifiedIDs();
            expect(ids[0]).toEqual("148.3_INIVELNAL_DICI_M_26:percent_change");
            expect(ids[1]).toEqual("148.3_INIVELGBA_DICI_M_21:percent_change");
        });
        it("The 'representation_mode' query param does not adjust already composite IDs", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=148.3_INIVELNAL_DICI_M_26:change,148.3_INIVELGBA_DICI_M_21&representation_mode=percent_change";
            extractor = new IDsExtractor(url);
            ids = extractor.getModifiedIDs();
            expect(ids[0]).toEqual("148.3_INIVELNAL_DICI_M_26:change");
            expect(ids[1]).toEqual("148.3_INIVELGBA_DICI_M_21:percent_change");
        });

    })

    describe("Extraction of IDs but excluding a certain composite or pure one from them", () => {

        it("If the ID to be excluded is pure, it is simply excluded", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006,99.3_IR_2008_0_9";
            extractor = new IDsExtractor(url);
            ids = extractor.getIDsExcludingCertainOne("defensa_FAA_0006");
            expect(ids[0]).toEqual("99.3_IR_2008_0_9");
            expect(ids.length).toBe(1);
        });
        it("If the ID to be excluded is pure but not present, it is not excluded", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006,99.3_IR_2008_0_9";
            extractor = new IDsExtractor(url);
            ids = extractor.getIDsExcludingCertainOne("148.3_INIVELNAL_DICI_M_26");
            expect(ids.length).toBe(2);
        });
        it("If the ID to be excluded is composite and is explicitly present, it is excluded", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26,148.3_INIVELGBA_DICI_M_21:change";
            extractor = new IDsExtractor(url);
            ids = extractor.getIDsExcludingCertainOne("148.3_INIVELGBA_DICI_M_21:change");
            expect(ids[0]).toEqual("148.3_INIVELNAL_DICI_M_26");
            expect(ids.length).toBe(1);
        });
        it("If the ID to be excluded is composite and is implicitly modified, it is excluded", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26,148.3_INIVELGBA_DICI_M_21&representation_mode=percent_change";
            extractor = new IDsExtractor(url);
            ids = extractor.getIDsExcludingCertainOne("148.3_INIVELGBA_DICI_M_21:percent_change");
            expect(ids[0]).toEqual("148.3_INIVELNAL_DICI_M_26");
            expect(ids.length).toBe(1);
        });
        it("If the ID to be excluded is composite and is not present nor implicitly modified, it is not excluded", () => {
            url = "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26,148.3_INIVELGBA_DICI_M_21&representation_mode=change";
            extractor = new IDsExtractor(url);
            ids = extractor.getIDsExcludingCertainOne("148.3_INIVELGBA_DICI_M_21:percent_change");
            expect(ids[0]).toEqual("148.3_INIVELNAL_DICI_M_26");
            expect(ids[1]).toEqual("148.3_INIVELGBA_DICI_M_21");
        });

    })

})

describe("Extraction of date range from the URL", () => {

    let url: string;
    let dateRange: IDateRange;

    it("If no dates are specified, the range has no limits", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=99.3_IR_2008_0_9";
        dateRange = getDateFromUrl(url);
        expect(dateRange.start).toEqual('');
        expect(dateRange.end).toEqual('');
    });
    it("If only start date is specified, then only such is included as a limit", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=99.3_IR_2008_0_9&start_date=2017-05-30";
        dateRange = getDateFromUrl(url);
        expect(dateRange.start).toEqual('2017-05-30');
        expect(dateRange.end).toEqual('');
    });
    it("If only end date is specified, then only such is included as a limit", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=99.3_IR_2008_0_9&end_date=2019-04-21";
        dateRange = getDateFromUrl(url);
        expect(dateRange.start).toEqual('');
        expect(dateRange.end).toEqual('2019-04-21');
    });
    it("If both dates are specified, then the range has both of its limits", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=99.3_IR_2008_0_9&start_date=2010-11-04&end_date=2015-06-28";
        dateRange = getDateFromUrl(url);
        expect(dateRange.start).toEqual('2010-11-04');
        expect(dateRange.end).toEqual('2015-06-28');
    });

})

describe("Obtention of the representation mode param from the URL", () => {

    let url: string;
    let representationMode: string

    it("If the representation_mode query param is present, it is returned", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=300.2_AP_PAS_APEDEG_0_A_32:percent_change&representation_mode=change";
        representationMode = getRepresentationModeFromUrl(url);
        expect(representationMode).toEqual('change');
    });
    it("If no query param is specified, but every id has the same modifier, such is returned", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006:change_a_year_ago,74.3_ISC_0_M_19:change_a_year_ago";
        representationMode = getRepresentationModeFromUrl(url);
        expect(representationMode).toEqual('change_a_year_ago');
    });
    it("If no query param is specified, but ids differ on their modifiers, the default is returned", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=77.3_IEA_0_A_27_2:change,77.3_IEA_0_A_27:percent_change_a_year_ago";
        representationMode = getRepresentationModeFromUrl(url);
        expect(representationMode).toEqual(DEFAULT_REPRESENTATION_MODE);
    });
    it("Unmodified ids have the default representation mode as modifier", () => {
        url = "https://apis.datos.gob.ar/series/api/series/?ids=bcra_4,221.1_PELECT_LES_1970_0_38";
        representationMode = getRepresentationModeFromUrl(url);
        expect(representationMode).toEqual(DEFAULT_REPRESENTATION_MODE);
    });

});

describe("Obtention of a new URL from a base one and a representation mode update", () => {

    let originalURL: string;
    let newRepMode: string;
    let updatedURL: string;

    it("If the base URL has the representation_mode query param, it is replaced with the new one", () => {
        originalURL = 'https://apis.datos.gob.ar/series/api/series/?ids=snic_hdv_22&representation_mode=change_since_beginning_of_year';
        newRepMode = 'percent_change';
        updatedURL = getUpdatedRepModeURL(originalURL, newRepMode);
        expect(updatedURL).toEqual('https://apis.datos.gob.ar/series/api/series/?ids=snic_hdv_22&representation_mode=percent_change');
    });
    it("If the query param is not present and the new mode is not the default one, the param is added", () => {
        originalURL = 'https://apis.datos.gob.ar/series/api/series/?ids=ahora12_operaciones_7o6Vx1';
        newRepMode = 'change';
        updatedURL = getUpdatedRepModeURL(originalURL, newRepMode);
        expect(updatedURL).toEqual('https://apis.datos.gob.ar/series/api/series/?ids=ahora12_operaciones_7o6Vx1&representation_mode=change');
    });
    it("If the query param is not present and the new mode is the default one, the URL is not updated at all", () => {
        originalURL = 'https://apis.datos.gob.ar/series/api/series/?ids=105.1_I2JC_2016_M_21';
        newRepMode = 'value';
        updatedURL = getUpdatedRepModeURL(originalURL, newRepMode);
        expect(updatedURL).toEqual(originalURL);
    });

})

describe("Obtention of the collapse and aggregation params from the URL", () => {

    let url: string;
    let params: ICollapseParams;

    it("If the collapse query param is present, it is returned as such", () => {
        url = 'https://apis.datos.gob.ar/series/api/series/?ids=122.2_CV_1999_0_12&collapse=semester';
        params = getCollapseParamsFromUrl(url);
        expect(params.collapse).toEqual('semester');
    });
    it("If the collapse query param is absent, the empty string is inferred as such", () => {
        url = 'https://apis.datos.gob.ar/series/api/series/?ids=bcra_monedas_0402';
        params = getCollapseParamsFromUrl(url);
        expect(params.collapse).toEqual('');
    });
    it("If the collapse_aggregation query param is present, it is returned as such", () => {
        url = 'https://apis.datos.gob.ar/series/api/series/?ids=ahora12_corrientes_ub0WCc&collapse=year&collapse_aggregation=max';
        params = getCollapseParamsFromUrl(url);
        expect(params.collapseAggregation).toEqual('max');
    });
    it("If the collapse_aggregation query param is absent, 'avg' is inferred as such", () => {
        url = 'https://apis.datos.gob.ar/series/api/series/?ids=302.1_S_ORIGINALRGA_0_A_23&collapse=month';
        params = getCollapseParamsFromUrl(url);
        expect(params.collapseAggregation).toEqual('avg');
    });

});

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