import {PeriodicityManager} from "../../../api/utils/periodicityManager";


describe("PeriodicityManager", () => {
    let periodicityParser: PeriodicityManager;


    describe("Diaria", () => {
        beforeEach(() => { periodicityParser = new PeriodicityManager('R/P1D'); });

        it("returns Diaria", () => {
            expect(periodicityParser.formattedPeriodicity()).toEqual('Diaria');
        });

        it("returns 2018-05-16", () => {
            expect(periodicityParser.formatDate('2018-05-16')).toEqual('2018-05-16');
        });
    });

    describe("Mensual", () => {
        beforeEach(() => { periodicityParser = new PeriodicityManager('R/P1M'); });

        it("returns Mensual", () => {
            expect(periodicityParser.formattedPeriodicity()).toEqual('Mensual');
        });

        it("returns 2018-05", () => {
            expect(periodicityParser.formatDate('2018-05-16')).toEqual('2018-05');
        });
    });

    describe("Anual", () => {
        beforeEach(() => { periodicityParser = new PeriodicityManager('R/P1Y'); });

        it("returns Anual", () => {
            expect(periodicityParser.formattedPeriodicity()).toEqual('Anual');
        });

        it("returns 2018", () => {
            expect(periodicityParser.formatDate('2018-05-16')).toEqual('2018');
        });
    });

    describe("Trimestral", () => {
        beforeEach(() => { periodicityParser = new PeriodicityManager('R/P3M'); });

        it("returns Trimestral", () => {
            expect(periodicityParser.formattedPeriodicity()).toEqual('Trimestral');
        });

        it("returns 2018-05", () => {
            expect(periodicityParser.formatDate('2018-05-16')).toEqual('2018-05');
        });
    });

    describe("Semestral", () => {
        beforeEach(() => { periodicityParser = new PeriodicityManager('R/P6M'); });

        it("returns Semestral", () => {
            expect(periodicityParser.formattedPeriodicity()).toEqual('Semestral');
        });

        it("returns 2018-05", () => {
            expect(periodicityParser.formatDate('2018-05-16')).toEqual('2018-05');
        });
    });
});
