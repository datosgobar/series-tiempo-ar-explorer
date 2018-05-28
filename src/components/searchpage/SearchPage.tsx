import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './SearchPage.css';

import { loadSearchResults } from '../../actions/seriesActions';
import { ISearchResultItem, ISerieApi } from '../../api/SerieApi';
import { IStore } from '../../store/initialState';
import SearchBox from '../common/searchbox/SearchBox'
import SearchResults from './searchresults/SearchResults';


interface ISearchPageProps extends RouteComponentProps<any> {
    searchResults: ISearchResultItem[];
    readonly dispatch: (action: object) => void;
    seriesApi: ISerieApi;
}

class SearchPage extends React.Component<ISearchPageProps, any> {

    private unListen: () => void;

    constructor(props: any, context: any) {
        super(props, context);

        this.onResultsFetchedSuccess = this.onResultsFetchedSuccess.bind(this);
        this.fetchResults = this.fetchResults.bind(this);

        this.fetchResults(this.props.location);
    }

    public componentDidMount() {
        this.unListen = this.props.history.listen(this.fetchResults);
    }

    public componentWillUnmount() {
        this.unListen();
    }

    public onResultsFetchedSuccess(searchResults: ISearchResultItem[]) {
        this.props.dispatch(loadSearchResults(searchResults));
    }

    public fetchResults(location: Location) {
        const search: string = location.search; // could be '?foo=bar'
        const params: URLSearchParams = new URLSearchParams(search);
        const query: string | null = params.get('q');
        
        if(!query){
            return;
        }
        
        let offset: number | string | null = params.get('offset');
        let limit: number | string | null = params.get('limit');

        offset = offset? parseInt(offset, 10): 0;
        limit = limit? parseInt(limit, 10): 10;

        this.props.seriesApi.searchSeries(query, offset, limit).then(this.onResultsFetchedSuccess).catch(alert);
    }

    public render() {
        return (
            <div className='SearchPage'>
                <h1>Resultados Busqueda</h1>

                <SearchBox />

                <SearchResults searchResults={this.props.searchResults} />
            </div>
        );
    }
}

function mapStateToProps(state: IStore, ownProps: ISearchPageProps) {
    return {
        searchResults: state.searchResults,
        seriesApi: state.seriesApi,
    };
}

export default withRouter<ISearchPageProps>(connect(mapStateToProps)(SearchPage));