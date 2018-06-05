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

        this.readUriParams = this.readUriParams.bind(this);
        this.updateUriParams = this.updateUriParams.bind(this);
        this.sourcePicked = this.sourcePicked.bind(this);
    }

    public componentDidMount() {

        this.unListen = this.props.history.listen(location => {
            this.updateSearchParams(location)
        });

        this.updateSearchParams(this.props.location)
    }

    public updateSearchParams(location: Location){
        const searchParams = this.readUriParams(location);

        if (searchParams) {
            this.props.dispatch(setSearchParams(searchParams));
        }
    }

    public componentWillUnmount() {
        this.unListen();
    }

    public readUriParams(location: Location): ISearchParams | void {
        const search: string = location.search; // could be '?foo=bar'
        const params: URLSearchParams = new URLSearchParams(search);
        const q: string | null = params.get('q');

        if (!q) {
            return;
        }

        const offsetString: string | null = params.get('offset');
        const limitString: string | null = params.get('limit');

        const offset = offsetString ? parseInt(offsetString, 10) : initialState.searchParams.offset;
        const limit: number = limitString ? parseInt(limitString, 10) : initialState.searchParams.limit;

        const datasetSource = params.get('dataset_source') || "";

        return ({
            datasetSource,
            limit,
            offset,
            q,
        });
    }

    public updateUriParams(q: string, datasetSource: string, offset: number, limit: number) {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('q', q);
        urlSearchParams.append('dataset_source', datasetSource);
        urlSearchParams.append('offset', offset.toString());
        urlSearchParams.append('limit', limit.toString());

        this.props.history.push('/search/?' + urlSearchParams);
    }

    public sourcePicked(event: React.MouseEvent<HTMLElement>, newDatasetSource: string): void {
        event.stopPropagation()

        const oldSearchParams = this.readUriParams(this.props.location)

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q, newDatasetSource, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public render() {
        return (
            <div className='SearchPage'>
                <h1>Resultados Busqueda</h1>
                <Filters seriesApi={this.props.seriesApi} onSourcePicked={this.sourcePicked} />
                <Searcher
                    datasetSource={initialState.searchParams.datasetSource}
                    limit={initialState.searchParams.limit}
                    offset={initialState.searchParams.offset}
                    q={initialState.searchParams.q}
                    seriesApi={this.props.seriesApi}
                    onWillSearch={this.updateUriParams} 
                    renderSearchResults={renderSearchResults}/>
            </div>
        );
    }
}

function renderSearchResults(searchResults: ISearchResultItem[]): JSX.Element{
    return  <SearchResults searchResults={searchResults} />
}

function mapStateToProps(state: IStore, ownProps: ISearchPageProps) {
    return {
        seriesApi: state.seriesApi,
    };
}

export default withRouter<ISearchPageProps>(connect(mapStateToProps)(SearchPage));
