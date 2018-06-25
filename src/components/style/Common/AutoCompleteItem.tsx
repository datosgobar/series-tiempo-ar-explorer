import * as React from 'react';

import { ISearchResultItem } from '../../../api/SerieApi';


interface IAutoCompleteItemProps extends React.Props<any> {

    item: ISearchResultItem;
    isHighlighted: boolean;
}

export default class AutoCompleteItem extends React.Component<IAutoCompleteItemProps> {

    public render() {
        return (
            <div style={{ background: this.props.isHighlighted ? 'lightgray' : 'white' }}>
                {this.props.item.description} <br />
                {this.props.item.dataset.title} |
                Periodo: {this.props.item.index.start} - {this.props.item.index.end} |
                Unidades: {this.props.item.units} |
                Frecuencia: {this.props.item.accuralPeriodisity}
            </div>
        );
    }
}