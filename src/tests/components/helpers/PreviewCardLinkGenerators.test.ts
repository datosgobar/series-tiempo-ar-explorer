import { IPreviewCardExportableConfig } from "../../../indexPreviewCard";
import { getClickTarget } from "../../../helpers/previewCard/linkGenerators";

describe("Tests for generation of the target URL to open when clicking on the PreviewCard", () => {

    let config: IPreviewCardExportableConfig ;
    let clickTarget: string;

    beforeEach(() => {
        config = {
            serieId: "103.1_I2N_2016_M_15"
        }
    })

    it("If no URL for the Explorer is defined, the default one is used as prefix", () => {
        clickTarget = getClickTarget(config);
        expect(clickTarget).toEqual("https://datos.gob.ar/series/api/series/?ids=103.1_I2N_2016_M_15");
    });
    it("If only a Base URL for the API is defined, it is used as a prefix", () => {
        config.apiBaseUrl = "https://my.api.com";
        clickTarget = getClickTarget(config);
        expect(clickTarget).toEqual("https://my.api.com/series/?metadata=full&ids=103.1_I2N_2016_M_15&last=5000");
    });
    it("If only a URL for the Explorer is defined, it is used as a prefix", () => {
        config.explorerUrl = "https://custom.series.explorer.com";
        clickTarget = getClickTarget(config);
        expect(clickTarget).toEqual("https://custom.series.explorer.com/?ids=103.1_I2N_2016_M_15"); 
    });
    it("If both URLs are defined as params, the Explorer one is used as prefix", () => {
        config.apiBaseUrl = "https://base.api.com";
        config.explorerUrl = "https://explorer.net";
        clickTarget = getClickTarget(config);
        expect(clickTarget).toEqual("https://explorer.net/?ids=103.1_I2N_2016_M_15"); 
    })
    

})