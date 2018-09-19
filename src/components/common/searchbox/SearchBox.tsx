// tslint:disable-next-line:no-var-requires
const debounce = require('debounce');

import * as React from 'react';

import { ISearchResponse } from "../../../api/ITSAPIResponse";
import SearchResult from '../../../api/SearchResult';
import { ISerieApi } from '../../../api/SerieApi';
import AutoComplete from '../../style/Common/AutoComplete';
import AutoCompleteItem from '../../style/Common/AutoCompleteItem';
import SearchIcon from '../../style/Common/SearchIcon';
import HeroFormSearch from '../../style/Hero/HeroFormSearch';
import LoadingSpinner from "../LoadingSpinner";


interface ISearchBoxProps {

    onSelect: (serieId: string) => void;
    onSearch: (searchTerm: string) => void;
    searchTerm?: string;
    seriesApi: ISerieApi;
}

interface ISearchBoxState {
    searchTerm: string;
    autoCompleteItems: SearchResult[];
    loading: boolean;
}

class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {

    constructor(props: ISearchBoxProps) {
        super(props);

        this.state = {
            autoCompleteItems: [],
            loading: false,
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
                .searchSeries(searchTerm, {offset: 0, limit: 10})
                .then((response: ISearchResponse) => {
                    this.setState({ autoCompleteItems:  response.result, loading: false })
                });
        }
    }

    public onSearchTermChange(event: any) {
        const searchTerm: string = event.target.value;
        this.setState({ searchTerm, loading: true });

        this.updateAutoCompleteItems(searchTerm);
    }

    public triggerSearch(event: any) {
        event.preventDefault();
        this.props.onSearch(this.state.searchTerm);
    }

    public onSelect(val: string, item: SearchResult) {
        item.id === 'search' ? this.props.onSearch(this.state.searchTerm) : this.props.onSelect(item.id);
    }

    public render() {
        return (
            <HeroFormSearch onSubmit={this.triggerSearch} >
                <AutoComplete value={this.state.searchTerm}
                              onChange={this.onSearchTermChange}
                              getItemValue={getItemValue}
                              items={this.itemsToRender()}
                              renderItem={this.renderItem}
                              onSelect={this.onSelect}
                              wrapperProps={{className: 'form-autocomplete'}} />

                <SearchIcon onClick={this.triggerSearch} />
            </HeroFormSearch>
        );
    }

    private itemsToRender() {
        const firstItem = {id: 'search', title: `Buscar: ${this.state.searchTerm}`};
        return [firstItem].concat(this.state.autoCompleteItems);
    }

    private renderItem(item: SearchResult, isHighlighted: boolean) {
        return item.id === 'search' ? this.renderSearch(item, isHighlighted) : this.renderItemResult(item, isHighlighted);
    }

    private renderSearch(item: SearchResult, isHighlighted: boolean) {
        if (this.state.searchTerm !== "" && this.state.loading) {
            return <div key={this.state.searchTerm}><LoadingSpinner /></div>
        } else {
            const onClick = () => this.props.onSearch(this.state.searchTerm);
            return (<div id={item.id} key={item.id} onClick={onClick} className={isHighlighted ? 'highlight-item pointer' : 'pointer'}>{item.title}</div>)
        }
    }

    private renderItemResult(item: SearchResult, isHighlighted: boolean) {
        const onClick = () => this.onSelect('', item);

        return (
            <AutoCompleteItem key={item.id} item={item} isHighlighted={isHighlighted} searchTerm={this.state.searchTerm} handleClick={onClick} />
        );
    }
}

function getItemValue(item: SearchResult) { return item.title; }


export default SearchBox;
