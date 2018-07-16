import * as React from 'react';

import SearchResult from '../../../api/SearchResult';


interface IAutoCompleteItemProps extends React.Props<any> {

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
                <h4 className="font-1 title-xsm">{this.props.item.title}</h4>
                <p className="small color-g no-mg">
                    {this.props.item.description} |
                    Periodo: {this.props.item.index.start} - {this.props.item.index.end} |
                    Unidades: {this.props.item.units} |
                    Frecuencia: {this.props.item.accrualPeriodicity}
                </p>
            </div>
        );
    }
}