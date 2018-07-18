import * as React from 'react'
import {ISerie} from "../../../api/Serie";
import {TweetShorter} from "./TweetShorter";

interface ITwitterShareProps {
    series: ISerie[]
}

export class TwitterShare extends React.Component<ITwitterShareProps> {

    public render() {
        return (
            <li>
                <a href={this.tweetMessage()} target="_blank">
                    <i className="fab fa-twitter" />
                </a>
            </li>
        )
    }

    public tweetMessage(): string {
        const url = window.location.href;
        const titles = `${this.props.series.map(serie => serie.title).join('\n')}`;
        const tweetShorter = new TweetShorter(titles, url);

        return tweetShorter.finalUrl();
    }

}
