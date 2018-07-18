import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as ReactTooltip from 'react-tooltip';
import {IShareProps} from "../Share";

interface ILinkShareProps {
    url: string;
}

interface ILinkShareState {
    copied: boolean;
    url: string;
}

const COPIED_MESSAGE = '¡Copiado!';
const COPY_MESSAGE = 'Click para copiar enlace';

export class LinkShare extends React.Component<ILinkShareProps, ILinkShareState> {

    constructor(props: IShareProps) {
        super(props);
        this.onCopy = this.onCopy.bind(this);
        this.copyMessage = this.copyMessage.bind(this);
        this.state = { copied: false, url: '' };
    }

    public onCopy() {
        this.setState({copied: true, url: window.location.href})
    }

    public render() {
        return (
            <span>
                <CopyToClipboard text={this.props.url} onCopy={this.onCopy}>
                    <span className="url" style={{cursor: 'pointer'}} data-tip={this.copyMessage()}>
                        <i className="fa fa-link"/>&nbsp;
                        <span className="url-text">Enlace para compartir:&nbsp;
                            <span className="legend">{this.props.url}</span>
                        </span>
                    </span>
                </CopyToClipboard>
                <ReactTooltip effect="solid" getContent={this.copyMessage}/>
            </span>
        )
    }

    private copyMessage(): string {
        return this.state.url === window.location.href ? COPIED_MESSAGE : COPY_MESSAGE;
    }

}