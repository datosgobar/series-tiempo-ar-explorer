import * as React from "react";
import { IAggregationValue } from "../../../api/ITSAPIResponse";


export interface ISearchFilterProps {
    selected: any;
    items: IAggregationValue[];
    onChange: (item: string | null) => void;
    renderItem: (IAggregationValue: any) => JSX.Element | string;
}

export default class SearchFilter extends React.Component<ISearchFilterProps, any> {

    constructor(props: ISearchFilterProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.toClickableFilter = this.toClickableFilter.bind(this);
    }

    public handleClick(item: string) {
        return (event: React.SyntheticEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            event.stopPropagation();
            this.props.onChange(item);
        };
    }

    public render() {
        return <ul> {this.props.items.map(this.toClickableFilter)} </ul>
    }

    public toClickableFilter(item: IAggregationValue) {
        return (
            <li key={item.label}>
                <a onClick={this.handleClick(item.label)}>
                    <label>{this.props.renderItem(item.label)} <span className='result-filter-count'>({item.series_count})</span></label>
                </a>
            </li>
        );
    }
}
