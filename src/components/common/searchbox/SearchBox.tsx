// tslint:disable-next-line:no-var-requires
const debounce = require('debounce');

import * as React from 'react';

import SearchIcon from '../../style/Common/SearchIcon';
import HeroFormSearch from '../../style/Hero/HeroFormSearch';

import { ISearchResultItem, ISerieApi } from '../../../api/SerieApi';
import AutoComplete from '../../style/Common/AutoComplete';
import AutoCompleteItem from '../../style/Common/AutoCompleteItem';


interface ISearchBoxProps {

    onSelect: (serieId: string) => void;
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
                .searchSeries(searchTerm, {offset: 0, limit: 4})
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
                    renderItem={renderItem}
                    onSelect={this.onSelect} />

                <SearchIcon onClick={this.triggerSearch} />
            </HeroFormSearch>
        );
    }
}

function getItemValue(item: ISearchResultItem) { return item.title; }

function renderItem(item: ISearchResultItem, isHighlighted: boolean) {
    return (
        <AutoCompleteItem key={item.id} item={item} isHighlighted={isHighlighted} />
    );
}

export default SearchBox;
