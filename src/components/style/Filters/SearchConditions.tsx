import * as React from 'react';
import SearchResultsSorting from './SearchResultsSorting';
import SearchResultsTitle from './SearchResultsTitle';


interface ISearchConditionsProps {
    tagList: JSX.Element[];
    onSortByPicked: (criteria: string) => void;
}

export default (props: ISearchConditionsProps) =>
    <div className="search-conditions">
        <div className="title-and-sorting">
            <SearchResultsTitle />
            <SearchResultsSorting onSortByPicked={props.onSortByPicked}/>
        </div>
        <div>
            {props.tagList}
        </div>
    </div>

