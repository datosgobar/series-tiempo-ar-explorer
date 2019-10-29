import * as React from "react";

export const SORTING_VALUES = {
    FREQUENCY_ASC: "frequency-asc",
    FREQUENCY_DESC: "frequency-desc",
    HITS_90_DAYS_DESC: "hits_90_days-desc",
    HITS_90_DAYS_ASC: "hits_90_days-asc",
    RELEVANCE: "relevance"
}

interface ISearchResultsSortingOptionProps {
    text: string;
    value: string;
}

export default class SearchResultsSortingOption extends React.Component<ISearchResultsSortingOptionProps> {

    constructor(props: ISearchResultsSortingOptionProps) {
        super(props);
    }

    public render() {
        return (
            <option value={this.props.value}>{this.props.text}</option>
        )
    }

}