import * as React from "react";
import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as ReactTooltip from 'react-tooltip'
import {ISerie} from "../../api/Serie";

interface IShareProps {
    url: string;
    series: ISerie[]
}

export class Share extends React.Component<IShareProps, any> {

    constructor(props: IShareProps) {
        super(props);
        this.onCopy = this.onCopy.bind(this);
        this.copyMessage = this.copyMessage.bind(this);
    }

    public componentWillMount() {
        this.setState({copied: false, url: this.props.url});
    }

    public onCopy() {
        this.setState({copied: true, url: window.location.href})
    }

    public render() {
        return (
            <div className="share">
                <span className="caption">Compartir en</span>
                <ul className="social">
                    <li><a href={this.tweetMessage()} target="_blank"><i className="fab fa-twitter" /></a></li>&nbsp;
                    <li><a><i className="fab fa-facebook-f" /></a></li>
                </ul>
                <CopyToClipboard text={this.props.url} onCopy={this.onCopy}>
                    <span className="url" style={{cursor: 'pointer'}} data-tip={this.copyMessage()} >
                        <i className="fa fa-link" />&nbsp;
                        <span className="url-text">Enlace para compartir: <span className="legend">{this.props.url}</span></span>
                    </span>
                </CopyToClipboard>
                <span className="legend">Guarda este link para automatizar la búsqueda</span>
                <ReactTooltip effect="solid" getContent={this.copyMessage} />
            </div>
        )
    }

    private copyMessage(): string {
        return this.state.url === window.location.href ? '¡Copiado!' : 'Click para copiar enlace';
    }

    private tweetMessage(): string {
        const url = window.location.href.replace('#', '%23').replace(/&/g, '%26');
        const titles = this.props.series.map(serie => serie.title).join(' - ');

        return `http://twitter.com/intent/tweet?text=${titles} ${url}`;
    }

}
