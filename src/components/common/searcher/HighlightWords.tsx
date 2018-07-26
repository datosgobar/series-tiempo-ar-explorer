import * as React from 'react';
import Highlighter from "react-highlight-words";


export interface IHighlightWordsProps {
    text: string;
    words: string[]
}

export default (props: IHighlightWordsProps) =>
    <Highlighter highlightClassName="item-highlight"
                 searchWords={props.words}
                 autoEscape={true}
                 textToHighlight={props.text} />