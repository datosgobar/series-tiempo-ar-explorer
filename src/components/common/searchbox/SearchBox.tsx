// tslint:disable-next-line:no-var-requires
const debounce = require('debounce');

import * as React from 'react';
import * as AutoComplete from 'react-autocomplete';

import FormInput from '../../style/Common/FormInput';
import SearchIcon from '../../style/Common/SearchIcon';
import HeroFormSearch from '../../style/Hero/HeroFormSearch';

import { ISearchResultItem, ISerieApi } from '../../../api/SerieApi';


interface ISearchBoxProps {

    onSearch: (searchTerm: string) => void;
    searchTerm?: string;
    seriesApi: ISerieApi;
}

interface ISearchBoxState {

    searchTerm: string;
    autoCompleteItems: ISearchResultItem[];
}

class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {


    constructor(props: ISearchBoxProps) {
        super(props);

        this.state = {
            autoCompleteItems: [],
            searchTerm: this.props.searchTerm || "",
        };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.triggerSearch = this.triggerSearch.bind(this);
        this.updateAutoCompleteItems = debounce(this.updateAutoCompleteItems, 500);
        this.onSelect = this.onSelect.bind(this);
    }

    public componentDidUpdate(prevProps: ISearchBoxProps) {

        if (this.props.searchTerm && (this.props.searchTerm !== prevProps.searchTerm)) {
            this.setState({
                searchTerm: this.props.searchTerm
            });
        }
    }

    public updateAutoCompleteItems(searchTerm: string) {
        if (searchTerm.length) {
            this.props.seriesApi
                .searchSeries(searchTerm, undefined, 0, 4)
                .then((autoCompleteItems: ISearchResultItem[]) => {
                    this.setState({ autoCompleteItems })
                });
        }
    }

    public onSearchTermChange(event: any) {
        const searchTerm: string = event.target.value;
        this.setState({ searchTerm });

        this.updateAutoCompleteItems(searchTerm);
    }

    public triggerSearch(event: any) {
        event.preventDefault();
        this.props.onSearch(this.state.searchTerm);
    }

    public onSelect(val: string, item: ISearchResultItem) {
        this.props.onSearch(val);
    }

    public render() {
        return (
            <HeroFormSearch onSubmit={this.triggerSearch} >
                <FormInput
                    id="searchterm"
                    value={this.state.searchTerm}
                    type='text'
                    placeholder='Buscar Serie'
                    onChange={this.onSearchTermChange} />

                <SearchIcon onClick={this.triggerSearch} />
            </HeroFormSearch>
            <div className='SearchBox'>
                <form onSubmit={this.triggerSearch} >
                    <AutoComplete
                        value={this.state.searchTerm}
                        onChange={this.onSearchTermChange}
                        getItemValue={getItemValue}
                        items={this.state.autoCompleteItems}
                        renderItem={renderItem}
                        onSelect={this.onSelect} />

                    <input
                        type='submit'
                        value='Buscar' />
                </form>
            </div>
        );
    }
}

function getItemValue(item: ISearchResultItem) { return item.title; }

function renderItem(item: ISearchResultItem, isHighlighted: boolean) {
    return (
        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {isHighlighted ? <b>{item.title}</b> : item.title}
        </div>
    );
}

export default SearchBox;
