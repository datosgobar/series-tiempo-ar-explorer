import CardExportable, { ICardExportableProps } from "../../../components/exportable/CardExportable";
import { generateBasicMockCardExportableProps } from "../../support/mockers/cardMockers";

describe("Tests for the CardExportable component", () => {

    let mockCardProps: ICardExportableProps;
    let cardExportable: CardExportable;
    let finalAPIurl: string;

    function getCardFinalAPI() {
        return cardExportable.getDownloadUrl().split("/series/?")[0];
    }

    describe("Injection of API base URL for the chart inside", () => {

        beforeEach(() => {
            mockCardProps = generateBasicMockCardExportableProps();
        })

        it("If no base URL is specified, then the default one is used", () => {
            cardExportable = new CardExportable(mockCardProps);
            finalAPIurl = getCardFinalAPI();
            expect(finalAPIurl).toEqual("https://apis.datos.gob.ar/series/api");
        });
        it("Specifying the base URL makes it the asked one", () => {
            mockCardProps.apiBaseUrl = "https://custom.api.url/arg"
            cardExportable = new CardExportable(mockCardProps);
            finalAPIurl = getCardFinalAPI();
            expect(finalAPIurl).toEqual("https://custom.api.url/arg");
        });

    })

})