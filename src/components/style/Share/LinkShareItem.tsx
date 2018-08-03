import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';


interface ILinkShareProps {
    url: string;
    text: string;
}

export default (props: ILinkShareProps) =>

    <CopyToClipboard text={props.url}>
        <li data-tip="Click me to show the tooltip" >
            <a className="pointer" >
                <span>
                    <i className="fas fa-link fa-lg"/> {props.text}
                </span>
            </a>
        </li>
    </CopyToClipboard>
