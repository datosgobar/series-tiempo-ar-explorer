import { urlToString, cleanUrl, csvShareURL, jsonShareURL } from "../../../helpers/graphic/graphicLinkBuilders";

describe('Link building functions for Dropdown components of the Card component', () => {

    describe('Conversion of URL ASCII keys to characters upon it', () => {

        let url: string;
        let expectedString: string;

        it("Replacement for the ',' character", () => {
            url = "https://datos.gob.ar/series/api/series/?ids=tmi_arg%2C116.4_TCRZE_2015_D_36_4";
            expectedString = "https://datos.gob.ar/series/api/series/?ids=tmi_arg,116.4_TCRZE_2015_D_36_4";
            expect(urlToString(url)).toEqual(expectedString);
        });
        it("Replacement for the ':' character", () => {
            url = "https%3A//datos.gob.ar/series/api/series/?ids=tmi_arg%3Apercent_change";
            expectedString = "https://datos.gob.ar/series/api/series/?ids=tmi_arg:percent_change";
            expect(urlToString(url)).toEqual(expectedString);
        });
        it("Replacement for the '/' character", () => {
            url = "https:%2F%2Fdatos.gob.ar%2Fseries%2Fapi/series";
            expectedString = "https://datos.gob.ar/series/api/series";
            expect(urlToString(url)).toEqual(expectedString);
        });
        it("Replacement for the '?' character", () => {
            url = "https://datos.gob.ar/series/api/series/%3Fids=105.1_I2QS_2016_M_20&metadata=full";
            expectedString = "https://datos.gob.ar/series/api/series/?ids=105.1_I2QS_2016_M_20&metadata=full";
            expect(urlToString(url)).toEqual(expectedString);
        });
        it("Replacement for multiple characters at a time", () => {
            url = "https%3A/%2Fdatos.gob.ar/series%2Fapi/series%2F%3Fids=tmi_arg%2C116.4_TCRZE_2015_D_36_4";
            expectedString = "https://datos.gob.ar/series/api/series/?ids=tmi_arg,116.4_TCRZE_2015_D_36_4";
            expect(urlToString(url)).toEqual(expectedString);
        });


    })

    describe('Removal of the chartType from an URL, in order to clean it', () => {

        let originalURL: string;
        let cleanedUrl: string;

        beforeAll(() => {
            cleanedUrl = "https://datos.gob.ar/series/api/series/?ids=Automotriz_patentamiento_67YQ7B&representation_mode=change";
        })

        it("If the URL has no chartType, there is no cleaning at all", () => {
            originalURL = "https://datos.gob.ar/series/api/series/?ids=Automotriz_patentamiento_67YQ7B&representation_mode=change";
            expect(cleanUrl(originalURL)).toEqual(cleanedUrl);
        });
        it("If the URL has a chartType query param, it is removed", () => {
            originalURL = "https://datos.gob.ar/series/api/series/?ids=Automotriz_patentamiento_67YQ7B&chartType=area&representation_mode=change";
            expect(cleanUrl(originalURL)).toEqual(cleanedUrl);
        });

    })

    describe('Generation of the CSV file link to be shared', () => {

        let originalURL: string;
        let csvURL: string;

        beforeAll(() => {
            csvURL = "https://datos.gob.ar/series/api/series/?ids=tmi_arg&format=csv";
        })

        it("If the original URL has a metadata query param, it is removed", () => {
            originalURL = "https://datos.gob.ar/series/api/series/?ids=tmi_arg&metadata=full";
            expect(csvShareURL(originalURL)).toEqual(csvURL);
        });
        it("If the URL has a start query param, it is removed", () => {
            originalURL = "https://datos.gob.ar/series/api/series/?start=0&ids=tmi_arg";
            expect(csvShareURL(originalURL)).toEqual(csvURL);
        });
        it("If the original URL has a chartType query param, it is removed", () => {
            originalURL = "https://datos.gob.ar/series/api/series/?ids=tmi_arg&chartType=column";
            expect(csvShareURL(originalURL)).toEqual(csvURL);
        });
        it("If the original URL has no removable query param, only the format is appended", () => {
            originalURL = "https://datos.gob.ar/series/api/series/?ids=tmi_arg";
            expect(csvShareURL(originalURL)).toEqual(csvURL);
        });

    })

    describe('Generation of the JSON file link to be shared', () => {

        let originalURL: string;
        let jsonURL: string;

        beforeAll(() => {
            jsonURL = "https://datos.gob.ar/series/api/series/?ids=440.1_ADMI_PUBLIRIA_2004_0_52_35&format=json";
        })

        it("If the original URL has a chartType query param, it is removed", () => {
            originalURL = "https://datos.gob.ar/series/api/series/?ids=440.1_ADMI_PUBLIRIA_2004_0_52_35&chartType=column";
            expect(jsonShareURL(originalURL)).toEqual(jsonURL);
        });
        it("If the original URL has no removable query param, only the format is appended", () => {
            originalURL = "https://datos.gob.ar/series/api/series/?ids=440.1_ADMI_PUBLIRIA_2004_0_52_35";
            expect(jsonShareURL(originalURL)).toEqual(jsonURL);
        });

    })

})