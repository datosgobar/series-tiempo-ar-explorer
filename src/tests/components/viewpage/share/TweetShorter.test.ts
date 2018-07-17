import {TweetShorter} from "../../../../components/viewpage/share/TweetShorter";


describe("TweetShorter", () => {
    const url = "http://localhost:3000";

    it("", () => {
        const tweetShorter = new TweetShorter("Test", url);

        expect(tweetShorter.shortenMessage()).toEqual("Test");
        expect(tweetShorter.finalUrl()).toEqual(`http://twitter.com/intent/tweet?text=Test&url=${encodeURIComponent(url)}`)
    });

    it("", () => {
        const msg = "IPC Núcleo. Base abr 2016. Mensual - Valor agregado bruto trimestral a precios de productor, del impuesto a las importaciones en pesos de 1993 - Valor agregado bruto anual, precios de productor, de valor agregado bruto a precios de productor en pesos de 1993 - Valor agregado neto";
        const tweetShorter = new TweetShorter(msg, url);

        expect(msg.length).toEqual(280);
        expect(tweetShorter.shortenMessage()).toEqual("IPC Núcleo. Base abr 2016. Mensual - Valor agregado bruto trimestral a precios de productor, del impuesto a las importaciones en pesos de 1993 - Valor agregado bruto anual, precios de productor, de valor agregado bruto a precios de productor en pesos de 1...");
        expect(tweetShorter.finalUrl()).toEqual(`http://twitter.com/intent/tweet?text=IPC Núcleo. Base abr 2016. Mensual - Valor agregado bruto trimestral a precios de productor, del impuesto a las importaciones en pesos de 1993 - Valor agregado bruto anual, precios de productor, de valor agregado bruto a precios de productor en pesos de 1...&url=${encodeURIComponent(url)}`)
    });

});
