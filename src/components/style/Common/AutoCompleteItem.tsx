import * as React from 'react';

import Highlighter from "react-highlight-words";
import SearchResult from '../../../api/SearchResult';


interface IAutoCompleteItemProps extends React.Props<any> {
    searchTerm: string;
    item: SearchResult;
    isHighlighted: boolean;
}

export default class AutoCompleteItem extends React.Component<IAutoCompleteItemProps> {

    public render() {
        return (
            <div ref={(node) => { // change this when main.less contains highlight class or similar
                if (node) {
                    node.style.setProperty("background-color", `${this.props.isHighlighted ? 'lightgray' : 'white'}`, "important");
                }}}>

                <a href="#">
                    <h4 className="font-1 title-xsm">
                        <Highlighter highlightClassName="item-highlight"
                                     searchWords={this.props.searchTerm.split(' ')}
                                     autoEscape={true}
                                     textToHighlight={this.props.item.title} />
                    </h4>

                    <p className="small color-g no-mg">
                        Dataset: {this.props.item.description} |
                        Periodo: {this.props.item.index.start} - {this.props.item.index.end} |
                        Unidades: {this.props.item.units} |
                        Frecuencia: {this.props.item.accrualPeriodicity}
                    </p>
                </a>
            </div>
        );
    }
}