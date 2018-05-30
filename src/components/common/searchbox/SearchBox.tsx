import * as React from 'react';

import './SearchBox.css';


interface ISearchBoxProps {

    onSearch: (searchTerm: string) => void;
    searchTerm?: string;
}

interface ISearchBoxState {

    searchTerm: string;
}

export class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {

    constructor(props: ISearchBoxProps) {
        super(props);

        this.state = { searchTerm: this.props.searchTerm || "" };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.triggerSearch = this.triggerSearch.bind(this);
    }

    public componentDidUpdate(prevProps: ISearchBoxProps){
        
        if(this.props.searchTerm && (this.props.searchTerm !== prevProps.searchTerm)){
            this.setState({
                searchTerm: this.props.searchTerm
            });
        }
    }

    public onSearchTermChange(event: any) {
        const searchTerm: string = event.target.value;
        this.setState({ searchTerm });
    }

    public triggerSearch(event: any) {
        event.preventDefault();
        this.props.onSearch(this.state.searchTerm);
    }

    public render() {
        return (
            <div className='SearchBox'>
                <form onSubmit={this.triggerSearch} >
                    <input
                        value={this.state.searchTerm}
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

export default SearchBox;
