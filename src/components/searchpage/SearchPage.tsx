import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './SearchPage.css';

import { loadSearchResults } from '../../actions/seriesActions';
import { ISearchResultItem, ISerieApi } from '../../api/SerieApi';
import SerieApi from '../../SerieApi';
import SearchBox from '../common/searchbox/SearchBox'
import SearchResults from './searchresults/SearchResults';


interface ISearchPageProps extends RouteComponentProps<any> {
    searchResults: ISearchResultItem[];
    readonly dispatch: (action: object) => void;
    seriesApi?: ISerieApi;
}

class SearchPage extends React.Component<ISearchPageProps, any> {

    private seriesApi: ISerieApi;

    constructor(props: any, context: any) {
        super(props, context);

        this.seriesApi = this.props.seriesApi || SerieApi;

        this.onResultsFetchedSuccess = this.onResultsFetchedSuccess.bind(this);

        this.fetchResults();
    }

    public onResultsFetchedSuccess(searchResults: any) {

        this.props.dispatch(loadSearchResults(searchResults));
    }

    public fetchResults() {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const query: string = params.get('q') || "";
        let offset: any = params.get('offset');
        let limit: any = params.get('limit');

        offset = offset? parseInt(offset, 10): 0;
        limit = limit? parseInt(limit, 10): 10;

        this.seriesApi.searchSeries(query, offset, limit).then(this.onResultsFetchedSuccess).catch(alert);
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

function mapStateToProps(state: any, ownProps: any) {
    return {
        searchResults: state.searchResults
    };
}

export default withRouter(connect(mapStateToProps)(SearchPage));