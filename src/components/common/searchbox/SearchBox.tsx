import * as React from 'react';
import { Link } from 'react-router-dom';

import './SearchBox.css';

interface ISearchBoxState {

    searchTerm: string;
}

export class SearchBox extends React.Component<any, ISearchBoxState> {

    constructor(props: any) {
        super(props);

        this.state = { searchTerm: "" };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
    }

    public onSearchTermChange(event: any) {
        const newSearchTerm: string = event.target.value;
        this.setState({ searchTerm: newSearchTerm });
    }


    public render() {
        return (
            <div className='SearchBox'>

                <input
                    type='text'
                    placeholder='Buscar Serie'
                    onChange={this.onSearchTermChange} />

                <Link to={`/search/?q=${this.state.searchTerm}`}>
                    <input
                        type='submit'
                        value='Buscar'/>
                </Link>
            </div>
        );
    }
}

export default SearchBox;
