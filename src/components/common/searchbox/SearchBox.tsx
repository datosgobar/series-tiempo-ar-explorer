import * as React from 'react';
import { Redirect, withRouter } from 'react-router';

import './SearchBox.css';

interface ISearchBoxState {

    searchTerm: string;
    redirect: JSX.Element | null;
}

export class SearchBox extends React.Component<any, ISearchBoxState> {

    constructor(props: any) {
        super(props);

        this.state = { searchTerm: "", redirect: null };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    public onSearchTermChange(event: any) {
        const newSearchTerm: string = event.target.value;
        this.setState({ searchTerm: newSearchTerm });
    }

    public componentDidUpdate(){
        if(this.state.redirect){
            this.setState({redirect: null});
        }
    }

    public onSearch(event: any) {

        this.setState({ redirect: <Redirect to={`/search/?q=${this.state.searchTerm}`} /> });
    }

    public render() {
        return (
            <div className='SearchBox'>
                {this.state.redirect}
                <form onSubmit={this.onSearch} >
                    <input
                        type='text'
                        placeholder='Buscar Serie'
                        onChange={this.onSearchTermChange} />

                    <input
                        type='submit'
                        value='Buscar' />
                </form>
            </div>
        );
    }
}

export default withRouter(SearchBox);
