import * as React from "react";
import { IAggregationValue } from "../../../api/ITSAPIResponse";


export interface ISearchFilterProps {
    selected: string;
    items: IAggregationValue[];
    onChange: (item: string) => void;
}

interface ISearchFiltersState {
    hiddenFilters: boolean;
}

export default class SearchFilter extends React.Component<ISearchFilterProps, ISearchFiltersState> {

    constructor(props: ISearchFilterProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.toClickableFilter = this.toClickableFilter.bind(this);
        this.showHiddenFilters = this.showHiddenFilters.bind(this);

        this.state = {
            hiddenFilters: true
        }
    }

    public handleClick(item: string) {
        return (event: React.SyntheticEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            event.stopPropagation();
            this.props.onChange(item);
        };
    }

    public showHiddenFilters() {
        this.setState({hiddenFilters: !this.state.hiddenFilters});
    }

    public render() {
        const itemsToRender = this.props.items.map(this.toClickableFilter);
        const itemsToShow = itemsToRender.slice(0, 5);
        const itemsHidden = itemsToRender.slice(5);
        const showLink = itemsHidden.length === 0 || !this.state.hiddenFilters;

        return (
            <ul>
                {itemsToShow}
                <a className="pointer" hidden={showLink} onClick={this.showHiddenFilters}>Ver más</a>
                <div className="hidden-filters" hidden={this.state.hiddenFilters}>{itemsHidden}</div>
            </ul>
        )
    }

    public toClickableFilter(item: IAggregationValue) {
        return (
            <li key={item.label}>
                <a onClick={this.handleClick(item.label)}>
                    <label className="pointer">{item.label} <span className='result-filter-count'>({item.series_count})</span></label>
                </a>
            </li>
        );
    }
}
