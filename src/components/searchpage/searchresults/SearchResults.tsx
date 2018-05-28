import * as React from "react";

import { ISearchResultItem } from "../../../api/SerieApi";
import Card from "../../common/card/Card";
import SearchResultItem from "./SearchResultItem";


interface ISearchResultsProps {
    searchResults: ISearchResultItem[];
}


class SearchResults extends React.Component<ISearchResultsProps, any> {

    public render() {

        return (

            <div className='SearchResults'>
                {this.props.searchResults.map(
                    (searchResult: ISearchResultItem) => (
                        <Card key={searchResult.id} about={<SearchResultItem searchResult={searchResult} />} />
                    )
                )}
            </div>
        );
    }
}


export default SearchResults;