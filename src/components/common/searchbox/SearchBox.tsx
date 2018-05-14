import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './SearchBox.css';

interface ISearchBoxState {

    searchTerm: string;
}

class SearchBox extends React.Component<any, ISearchBoxState> {

    constructor(props: any, context: any) {
        super(props, context);

        this.state = { searchTerm: this.props.searchTerm || "" };

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
                <Link to={'/search/' + this.state.searchTerm}>
                    <input
                        type='submit'
                        value='Buscar' />
                </Link>

            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        searchTerm: state.searchTem
    }
};

export default connect(mapStateToProps)(SearchBox);