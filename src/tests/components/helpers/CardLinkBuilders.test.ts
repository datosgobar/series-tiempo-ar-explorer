import { formatUrl, viewDatosGobAr } from "../../../helpers/card/cardLinkBuilders";

describe('Link building functions for Dropdown components of the Card component', () => {

    describe('Appendage of desired format to a download URL', () => {

        let url: string;
        let formatSuffix: string;

        beforeAll(() => {
            url = 'https://apis.datos.gob.ar/series/api/series/?ids=116.4_TCRZE_2015_D_36_4&last=5000';
        })
        
        it('Appendage of JSON format', () => {
            formatSuffix = 'json';
            const finalURL = formatUrl(url, formatSuffix);
            expect(finalURL).toEqual('https://apis.datos.gob.ar/series/api/series/?ids=116.4_TCRZE_2015_D_36_4&last=5000&format=json')
        });
        it('Appendage of CSV format', () => {
            formatSuffix = 'csv';
            const finalURL = formatUrl(url, formatSuffix);
            expect(finalURL).toEqual('https://apis.datos.gob.ar/series/api/series/?ids=116.4_TCRZE_2015_D_36_4&last=5000&format=csv')
        });

    })

    describe('Obtainment of URL to view the serie at datos.gob.ar', () => {

        let serieID: string;

        beforeAll(() => {
            serieID = '148.3_INIVELNAL_DICI_M_26:percent_change';
        })

        it('Basic serie, without collapse query param', () => {
            const viewURL = viewDatosGobAr(serieID);
            expect(viewURL).toEqual('https://datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26:percent_change');
        });
        it('Serie without collapse parameter', () => {
            const collapse = 'year';
            const viewURL = viewDatosGobAr(serieID, collapse);
            expect(viewURL).toEqual('https://datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26:percent_change&collapse=year');
        });

    })

})