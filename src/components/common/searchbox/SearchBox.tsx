import * as React from 'react';
import { withRouter } from 'react-router-dom';

import './SearchBox.css';

interface ISearchBoxState {

    searchTerm: string;
}

class SearchBox extends React.Component<any, ISearchBoxState> {

    constructor(props: any) {
        super(props);

        this.state = { searchTerm: "" };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    public onSearchTermChange(event: any) {
        const newSearchTerm: string = event.target.value;
        this.setState({ searchTerm: newSearchTerm });
    }

    public onSearch(event: any) {
        const uri = '/search/' + encodeURIComponent(escape(this.state.searchTerm));

        this.props.history.push(uri);
    }

    public render() {
        return (
            <div className='SearchBox'>
                <input
                    type='text'
                    placeholder='Buscar Serie'
                    onChange={this.onSearchTermChange} 
                    onSubmit={this.onSearch} />
                <input
                    type='submit'
                    value='Buscar' 
                    onClick={this.onSearch} />

            </div>
        );
    }
}

export default withRouter(SearchBox);
