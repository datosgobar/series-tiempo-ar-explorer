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
                    Dataset: {this.props.item.description} |
                    Periodo: {this.props.item.index.start} - {this.props.item.index.end} |
                    Unidades: {this.props.item.units} |
                    Frecuencia: {this.props.item.accrualPeriodicity}
                </p>
            </HighlightableItem>
        );
    }
}