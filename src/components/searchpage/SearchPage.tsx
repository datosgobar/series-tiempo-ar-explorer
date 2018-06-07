import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './SearchPage.css';

import { setSearchParams } from '../../actions/searchActions';
import { ISearchResultItem, ISerieApi } from '../../api/SerieApi';
import initialState, { IStore } from '../../store/initialState';
import Searcher, { ISearchParams } from '../common/searcher/Searcher';
import Filters from './filters/Filters';
import SearchResults from './searchresults/SearchResults';


interface ISearchPageProps extends RouteComponentProps<any> {
    seriesApi: ISerieApi;
    dispatch?: any;
}

class SearchPage extends React.Component<ISearchPageProps, any> {

    private unListen: () => void;

    constructor(props: any, context: any) {
        super(props, context);

        this.getUriSearchParams = this.getUriSearchParams.bind(this);
        this.updateUriParams = this.updateUriParams.bind(this);
        this.sourcePicked = this.sourcePicked.bind(this);
        this.themePicked = this.themePicked.bind(this);
    }

    public componentDidMount() {

        this.unListen = this.props.history.listen(location => {
            this.updateSearchParams(location)
        });

        this.updateSearchParams(this.props.location)
    }

    public updateSearchParams(location: Location) {
        let searchParams: ISearchParams;

        try {
            searchParams = this.getUriSearchParams(location);
        } catch {
            return;
        }

        this.props.dispatch(setSearchParams(searchParams));
    }

    public componentWillUnmount() {
        this.unListen();
    }

    public getUriSearchParams(location: Location): ISearchParams {
        const search: string = location.search; // could be '?foo=bar'
        const params: URLSearchParams = new URLSearchParams(search);
        const q: string | null = params.get('q');

        if (!q) {
            throw new Error("query not set");
        }

        const offsetString: string | null = params.get('offset');
        const limitString: string | null = params.get('limit');

        const offset = offsetString ? parseInt(offsetString, 10) : initialState.searchParams.offset;
        const limit: number = limitString ? parseInt(limitString, 10) : initialState.searchParams.limit;

        const datasetSource = params.get('dataset_source') || "";

        const datasetTheme = params.get('dataset_theme') || "";

        return ({
            datasetSource,
            datasetTheme,
            limit,
            offset,
            q,
        });
    }

    public updateUriParams(q: string, datasetSource: string, theme: string, offset: number, limit: number) {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('q', q);
        urlSearchParams.append('dataset_source', datasetSource);
        urlSearchParams.append('offset', offset.toString());
        urlSearchParams.append('limit', limit.toString());
        urlSearchParams.append('dataset_theme', theme);

        this.props.history.push('/search/?' + urlSearchParams);
    }

    public sourcePicked(event: React.MouseEvent<HTMLElement>, newDatasetSource: string): void {
        event.stopPropagation()

        let oldSearchParams: ISearchParams;

        try {
            oldSearchParams = this.getUriSearchParams(this.props.location)
        } catch {
            return;
        }

        this.updateUriParams(oldSearchParams.q, newDatasetSource, oldSearchParams.datasetTheme, oldSearchParams.offset, oldSearchParams.limit);
    }

    public themePicked(event: React.MouseEvent<HTMLElement>, newTheme: string): void {
        event.stopPropagation();

        let oldSearchParams: ISearchParams;

        try {
            oldSearchParams = this.getUriSearchParams(this.props.location)
        } catch {
            return;
        }

        this.updateUriParams(oldSearchParams.q, oldSearchParams.datasetSource, newTheme, oldSearchParams.offset, oldSearchParams.limit);
    }

    public render() {
        return (
            <div className='SearchPage'>
                <h1>Resultados Busqueda</h1>
                <Filters seriesApi={this.props.seriesApi} onSourcePicked={this.sourcePicked} onThemePicked={this.themePicked} />
                <Searcher
                    datasetSource={initialState.searchParams.datasetSource}
                    datasetTheme={initialState.searchParams.datasetTheme}
                    limit={initialState.searchParams.limit}
                    offset={initialState.searchParams.offset}
                    q={initialState.searchParams.q}
                    seriesApi={this.props.seriesApi}
                    onWillSearch={this.updateUriParams}
                    renderSearchResults={renderSearchResults} />
            </div>
        );
    }
}

function renderSearchResults(searchResults: ISearchResultItem[]): JSX.Element {
    return <SearchResults searchResults={searchResults} />
}

function mapStateToProps(state: IStore, ownProps: ISearchPageProps) {
    return {
        seriesApi: state.seriesApi,
    };
}

export default withRouter<ISearchPageProps>(connect(mapStateToProps)(SearchPage));
