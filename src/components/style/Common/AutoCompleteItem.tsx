import * as React from 'react';

import SearchResult from '../../../api/SearchResult';
import HighlightWords from '../../../components/common/searcher/HighlightWords'
import HighlightableItem from "./searchbox/HighlightableItem";


interface IAutoCompleteItemProps extends React.Props<any> {
    searchTerm: string;
    item: SearchResult;
    isHighlighted: boolean;
}

export default class AutoCompleteItem extends React.Component<IAutoCompleteItemProps> {

    public render() {
        return (
            <HighlightableItem isHighlighted={this.props.isHighlighted}>
                <h4 className="font-1 title-xsm">
                    <HighlightWords text={this.props.item.title} words={this.props.searchTerm.split(' ')} />
                </h4>

                <p className="small color-g no-mg">
                    <strong> Dataset: </strong> {this.props.item.description} |
                    <strong> Periodo: </strong> {this.props.item.startDate} - {this.props.item.endDate} |
                    <strong> Unidades: </strong> {this.props.item.units} |
                    <strong> Frecuencia: </strong> {this.props.item.fieldPeriodicity}
                </p>
            </HighlightableItem>
        );
    }
}