import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard';

interface ILinkShareProps {
    url: string;
    text: string;
}

export default (props: ILinkShareProps) =>

    <span>
        <CopyToClipboard text={props.url}>
            <span>
                <i className="fas fa-link fa-lg"/> {props.text}
            </span>
        </CopyToClipboard>
    </span>