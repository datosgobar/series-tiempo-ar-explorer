import * as React from 'react';

import SearchResult from '../../../api/SearchResult';


interface IAutoCompleteItemProps extends React.Props<any> {

    item: SearchResult;
    isHighlighted: boolean;
}

export default class AutoCompleteItem extends React.Component<IAutoCompleteItemProps> {

    public render() {
        return (
            <div style={{ background: this.props.isHighlighted ? 'lightgray' : 'white' }}>
                {this.props.item.title} <br />
                {this.props.item.description} |
                Periodo: {this.props.item.index.start} - {this.props.item.index.end} |
                Unidades: {this.props.item.units} |
                Frecuencia: {this.props.item.accrualPeriodicity}
            </div>
        );
    }
}