import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { setSearchParams } from '../../actions/searchActions';
import SearchResult from '../../api/SearchResult';
import { ISerieApi } from '../../api/SerieApi';
import { getMaxDecimalsAmount } from '../../helpers/common/decimalsAmountHandling';
import URLSearchParams from '../../helpers/common/URLSearchParams';
import initialState, { IStore } from '../../store/initialState';
import SearchBox from '../common/searchbox/SearchBox';
import Searcher, { ISearchParams, ISearchParamsItem } from '../common/searcher/Searcher';
import SearcherResultsWithChart from "../common/searcher/SearcherResultsWithChart";
import FiltersListContainer from '../style/Filters/FiltersListContainer';
import SearchFiltersResult from '../style/Filters/SearchFiltersResult';
import SelectedFiltersList from '../style/Filters/SelectedFiltersList';
import SeriesHero from '../style/Hero/SeriesHero';
import Tag from '../style/Tag/Tag';
import SeriesFilters from './filters/SeriesFilters';


interface ISearchPageProps extends RouteComponentProps<any> {
    seriesApi: ISerieApi;
    dispatch?: any;
    maxDecimals?: number;
}

class SearchPage extends React.Component<ISearchPageProps & ISearchParams, any> {

    private unListen: () => void;

    constructor(props: any, context: any) {
        super(props, context);

        this.getUriSearchParams = this.getUriSearchParams.bind(this);
        this.updateUriParams = this.updateUriParams.bind(this);
        this.sourcePicked = this.sourcePicked.bind(this);
        this.themePicked = this.themePicked.bind(this);
        this.searchTermPicked = this.searchTermPicked.bind(this);
        this.searchTags = this.searchTags.bind(this);
        this.themeRemoved = this.themeRemoved.bind(this);
        this.sourceRemoved = this.sourceRemoved.bind(this);
        this.redirectToViewPage = this.redirectToViewPage.bind(this);
        this.searchTagPicked = this.searchTagPicked.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
        this.publisherPicked = this.publisherPicked.bind(this);
        this.publisherRemoved = this.publisherRemoved.bind(this);
        this.unitsPicked = this.unitsPicked.bind(this);
        this.unitsRemoved = this.unitsRemoved.bind(this);
        this.catalogPicked = this.catalogPicked.bind(this);
        this.catalogRemoved = this.catalogRemoved.bind(this);
    }

    public componentDidMount() {
        this.unListen = this.props.history.listen(location => {
            this.updateSearchParams(location)
        });

        this.updateSearchParams(this.props.location)
    }

    public updateSearchParams(location: Location) {
        const searchParams = this.getUriSearchParams(location);

        this.props.dispatch(setSearchParams(searchParams));
    }

    public componentWillUnmount() {
        this.unListen();
    }

    public getUriSearchParams(location: Location): ISearchParams {
        const search: string = location.search; // could be '?foo=bar'
        const params: URLSearchParams = URLSearchParams(search);
        const q: string | null = params.get('q') || null;
        const offsetString: string | null = params.get('offset');
        const limitString: string | null = params.get('limit');
        const offset = offsetString ? parseInt(offsetString, 10) : initialState.searchParams.offset;
        const limit: number = limitString ? parseInt(limitString, 10) : initialState.searchParams.limit;
        const datasetSource = params.get('dataset_source') || "";
        const datasetTheme = params.get('dataset_theme') || "";
        const publisher = params.get('dataset_publisher_name') || "";
        const units = params.get('units') || "";
        const catalogId = params.get('catalog_id') || "";

        return { catalogId, datasetSource, datasetTheme, limit, offset, publisher, q, units }
    }

    public updateUriParams(params: ISearchParams) {
        const urlSearchParams = URLSearchParams();

        urlSearchParams.setOrDelete('q', params.q);
        urlSearchParams.setOrDelete('dataset_source', params.datasetSource);
        urlSearchParams.setOrDelete('offset', params.offset.toString());
        urlSearchParams.setOrDelete('limit', params.limit.toString());
        urlSearchParams.setOrDelete('dataset_theme', params.datasetTheme);
        urlSearchParams.setOrDelete('dataset_publisher_name', params.publisher);
        urlSearchParams.setOrDelete('units', params.units);
        urlSearchParams.setOrDelete('catalog_id', params.catalogId);

        this.props.history.push('/search/?' + urlSearchParams);
    }

    public filterChanged(newAttribute: ISearchParamsItem) {
        const searchParams = this.getUriSearchParams(this.props.location);
        searchParams[newAttribute.key] = newAttribute.value;
        this.updateUriParams(searchParams);
    }

    public sourceRemoved() {
        this.filterChanged({key: "datasetSource", value: ""});
    }

    public sourcePicked(newDatasetSource: string) {
        this.filterChanged({key: "datasetSource", value: newDatasetSource});
    }

    public themeRemoved() {
        this.filterChanged({key: "datasetTheme", value: ""});
    }

    public themePicked(newTheme: string) {
        this.filterChanged({key: "datasetTheme", value: newTheme});
    }

    public publisherPicked(newPublisher: string) {
        this.filterChanged({key: "publisher", value: newPublisher});
    }

    public publisherRemoved() {
        this.filterChanged({key: "publisher", value: ""});
    }

    public unitsPicked(newUnits: string) {
        this.filterChanged({key: "units", value: newUnits});
    }

    public unitsRemoved() {
        this.filterChanged({key: "units", value: ""});
    }

    public catalogPicked(newCatalog: string) {
        this.filterChanged({key: "catalogId", value: newCatalog});
    }

    public catalogRemoved() {
        this.filterChanged({key: "catalogId", value: ""});
    }

    public searchTermPicked(newSearchTerm: string) {
        this.filterChanged({key: "q", value: newSearchTerm});
    }

    public searchTagPicked() {
        this.filterChanged({key: "q", value: ""});
    }

    public searchTags(): JSX.Element[] {
        let tags: JSX.Element[] = [];
        const searchParams = this.getUriSearchParams(this.props.location);

        if (!searchParams) { return tags }

        tags = searchParams.q ? tags.concat(<Tag key={searchParams.q} onClose={this.searchTagPicked}>{searchParams.q}</Tag>) : tags;
        tags = searchParams.datasetTheme ? tags.concat(<Tag key={searchParams.datasetTheme} onClose={this.themeRemoved}>{searchParams.datasetTheme}</Tag>) : tags;
        tags = searchParams.datasetSource ? tags.concat(<Tag key={searchParams.datasetSource} onClose={this.sourceRemoved}>{searchParams.datasetSource}</Tag>) : tags;
        tags = searchParams.publisher ? tags.concat(<Tag key={searchParams.publisher} onClose={this.publisherRemoved}>{searchParams.publisher}</Tag>) : tags;
        tags = searchParams.units ? tags.concat(<Tag key={searchParams.units} onClose={this.unitsRemoved}>{searchParams.units}</Tag>) : tags;
        tags = searchParams.catalogId ? tags.concat(<Tag key={searchParams.catalogId} onClose={this.catalogRemoved}>{searchParams.catalogId}</Tag>) : tags;

        return tags;
    }

    public redirectToViewPage(serieId: string) {
        this.props.history.push('/series/?ids=' + serieId);
    }

    public render() {
        return (
            <section id="listado">
                <SeriesHero compact={true} searchBox={<SearchBox seriesApi={this.props.seriesApi} onSearch={this.searchTermPicked} onSelect={this.redirectToViewPage} />} />
                <FiltersListContainer>
                    <SeriesFilters onSourcePicked={this.sourcePicked}
                                    onThemePicked={this.themePicked}
                                    onPublisherPicked={this.publisherPicked}
                                    onUnitsPicked={this.unitsPicked}
                                    onCatalogPicked={this.catalogPicked} />
                    <SearchFiltersResult>
                        <SelectedFiltersList tagList={this.searchTags()} />

                        <Searcher datasetSource={this.props.datasetSource}
                                    datasetTheme={this.props.datasetTheme}
                                    limit={this.props.limit}
                                    offset={this.props.offset}
                                    q={this.props.q}
                                    seriesApi={this.props.seriesApi}
                                    renderSearchResults={this.renderSearchResults}
                                    dispatch={this.props.dispatch}
                                    publisher={this.props.publisher}
                                    units={this.props.units}
                                    catalogId={this.props.catalogId} />
                    </SearchFiltersResult>
                </FiltersListContainer>
            </section>
        );
    }

    private renderSearchResults(searchResults: SearchResult[]) {
        const maxDecimals = getMaxDecimalsAmount(this.props.maxDecimals);
        return <SearcherResultsWithChart searchResults={searchResults} 
                                         seriesApi={this.props.seriesApi} 
                                         maxDecimals={maxDecimals} />
    }
}


function mapStateToProps(state: IStore, ownProps: ISearchPageProps) {
    return {
        ...state.searchParams,
        maxDecimals: state.maxDecimals,
        seriesApi: state.seriesApi,
    };
}

export default withRouter<ISearchPageProps>(connect(mapStateToProps)(SearchPage));
