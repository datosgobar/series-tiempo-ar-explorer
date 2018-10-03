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
                 textToHighlight={props.text}  sanitize={sanitizer}/>


function sanitizer(text: string): string {
    return text.toLocaleLowerCase()
               .replace(/á/g, "a")
               .replace(/é/g, "e")
               .replace(/í/g, "i")
               .replace(/ó/g, "o")
               .replace(/ú/g, "u");
}
