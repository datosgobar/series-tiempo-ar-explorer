import * as React from "react";

import { ISearchResultItem } from "../../../api/SerieApi";
import Card from "../../common/card/Card";
import SearchResultItem from "./SearchResultItem";


interface ISearchPageProps {
    searchResults: ISearchResultItem[];
}

class SearchPage extends React.Component<ISearchPageProps, any> {

    public render() {

        return (

            <div className='SearchPage'>
                {this.props.searchResults.map(
                    (searchResult: ISearchResultItem) => (
                        <Card key={searchResult.id} about={<SearchResultItem searchResult={searchResult} />} />
                    )
                )}
            </div>
        );
    }
}


export default SearchPage;