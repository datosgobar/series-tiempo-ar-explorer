import * as React from "react";

import { ISearchResultItem } from "../../../api/SerieApi";


interface ISearchResultItemProps {

    searchResult: ISearchResultItem;
}

class SearchResultItem extends React.Component<ISearchResultItemProps, any> {


    public render() {
        return (

            <div className="SearchResultItem">
                <h6>{this.props.searchResult.title}</h6>
                <p>{this.props.searchResult.description}</p>
            </div>
        );
    }
}

export default SearchResultItem;