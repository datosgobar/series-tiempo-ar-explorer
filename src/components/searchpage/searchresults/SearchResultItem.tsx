import * as React from "react";
import { Link } from "react-router-dom";

import { ISearchResultItem } from "../../../api/SerieApi";


interface ISearchResultItemProps {

    searchResult: ISearchResultItem;
}

class SearchResultItem extends React.Component<ISearchResultItemProps, any> {


    public render() {
        return (

            <Link className='SearchResultItem' to={`/view/?id=${this.props.searchResult.id}`}>
                <h6>{this.props.searchResult.title}</h6>
                <p>{this.props.searchResult.description}</p>
            </Link>
        );
    }
}

export default SearchResultItem;