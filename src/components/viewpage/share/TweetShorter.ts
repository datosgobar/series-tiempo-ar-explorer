export class TweetShorter {

    private readonly message: string;
    private readonly url: string;
    private readonly maxTweetLength = 280;

    constructor(message: string, url: string) {
        this.message = message;
        this.url = url;
    }

    public shortenMessage(): string {
        const availableLength = Math.abs(this.url.length - this.maxTweetLength);

        if (this.message.length > availableLength) {
            return `${this.message.slice(0, availableLength - 3)}...`
        } else {
            return this.message;
        }
    }

    public finalUrl(): string {
        const encodedUrl = encodeURIComponent(this.url);
        const msg = encodeURIComponent(this.shortenMessage());
        return `http://twitter.com/intent/tweet?text=${msg}&url=${encodedUrl}`;
    }
}