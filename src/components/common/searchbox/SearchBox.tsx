import * as React from 'react';

import './SearchBox.css';

class SearchBox extends React.Component {

    constructor(props: any, context: any){
        super(props, context);

        this.onSubmit.bind(this);
    }

    public onSubmit (event: any) {
        this.search(event.target.value);
    }

    public search (searchTerm: string) {
        // TODO: implementar busqueda
    }

    public render () {
        return (
            <div className='SearchBox'>
                <input name={'search-box'} 
                    type='text' 
                    placeholder='Buscar Serie'
                    onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default SearchBox;