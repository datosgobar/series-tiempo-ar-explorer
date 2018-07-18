// tslint:disable-next-line:no-var-requires
const debounce = require('debounce');

import * as React from 'react';

import AutoComplete from '../../style/Common/AutoComplete';
import AutoCompleteItem from '../../style/Common/AutoCompleteItem';
import SearchIcon from '../../style/Common/SearchIcon';
import HeroFormSearch from '../../style/Hero/HeroFormSearch';

import SearchResult from '../../../api/SearchResult';
import { ISerieApi } from '../../../api/SerieApi';


interface ISearchBoxProps {

    onSelect: (serieId: string) => void;
    onSearch: (searchTerm: string) => void;
    searchTerm?: string;
    seriesApi: ISerieApi;
}

interface ISearchBoxState {

    searchTerm: string;
    autoCompleteItems: SearchResult[];
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
        this.renderItem = this.renderItem.bind(this);
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
                .searchSeries(searchTerm, {offset: 0, limit: 4})
                .then((autoCompleteItems: SearchResult[]) => {
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

    public onSelect(val: string, item: SearchResult) {
        this.props.onSelect(item.id);
    }

    public render() {
        return (
            <HeroFormSearch onSubmit={this.triggerSearch} >
                <AutoComplete
                    value={this.state.searchTerm}
                    onChange={this.onSearchTermChange}
                    getItemValue={getItemValue}
                    items={this.state.autoCompleteItems}
                    renderItem={this.renderItem}
                    onSelect={this.onSelect}
                    wrapperProps={{className: 'form-autocomplete'}}
                />

                <SearchIcon onClick={this.triggerSearch} />
            </HeroFormSearch>
        );
    }

    private renderItem(item: SearchResult, isHighlighted: boolean) {
        return (
            <AutoCompleteItem key={item.id} item={item} isHighlighted={isHighlighted} />
        );
    }
}

function getItemValue(item: SearchResult) { return item.title; }


export default SearchBox;
