import * as React from 'react';
import SearchResultsSorting from './SearchResultsSorting';
import SearchResultsTitle from './SearchResultsTitle';


interface ISearchConditionsProps {
    sorting: string;
    tagList: JSX.Element[];
    onSortingPicked: (criteria: string) => void;
}

export default (props: ISearchConditionsProps) =>
    <div className="search-conditions">
        <div className="title-and-sorting">
            <SearchResultsTitle />
            <SearchResultsSorting onSortingPicked={props.onSortingPicked} sorting={props.sorting}/>
        </div>
        <div>
            {props.tagList}
        </div>
    </div>

