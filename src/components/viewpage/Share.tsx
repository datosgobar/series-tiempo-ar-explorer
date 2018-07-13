import * as React from "react";
import {ISerie} from "../../api/Serie";

interface IShareProps {
    url: string;
    series: ISerie[]
}

export class Share extends React.Component<IShareProps, any> {

    constructor(props: IShareProps) {
        super(props);
    }

    public render() {
        return (
            <div className="share">
                <span className="caption">Compartir en</span>
                <ul className="social">
                    <li><a href={this.tweetMessage()} target="_blank"><i className="fab fa-twitter" /></a></li>&nbsp;
                    <li><a><i className="fab fa-facebook-f" /></a></li>
                </ul>
                <span className="url">
                    <i className="fa fa-link" />&nbsp;
                    <span className="url-text">Enlace para compartir: <a href={this.props.url}>{this.props.url}</a></span>
                </span>
                <span className="legend">Guarda este link para automatizar la búsqueda</span>
            </div>
        )
    }

    private tweetMessage(): string {
        const url = window.location.href;
        const titles = this.props.series.map(serie => serie.title).join(' | ');

        return `http://twitter.com/intent/tweet?text=${titles} ${url}`;
    }

}
