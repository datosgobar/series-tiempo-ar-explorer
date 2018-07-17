import {TweetShorter} from "../../../../components/viewpage/share/TweetShorter";


describe("TweetShorter", () => {
    const url = "http://localhost:3000";

    it("returns the final url including message and link", () => {
        const tweetShorter = new TweetShorter("Test", url);

        expect(tweetShorter.shortenMessage()).toEqual("Test");
        expect(tweetShorter.finalUrl()).toEqual(`http://twitter.com/intent/tweet?text=Test&url=${encodeURIComponent(url)}`)
    });

});
