import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { setSearchParams } from '../../actions/searchActions';
import SearchResult from '../../api/SearchResult';
import { ISerieApi } from '../../api/SerieApi';
import URLSearchParams from '../../helpers/URLSearchParams';
import initialState, { IStore } from '../../store/initialState';
import SearchBox from '../common/searchbox/SearchBox';
import Searcher, { ISearchParams } from '../common/searcher/Searcher';
import SearcherResultsWithChart from "../common/searcher/SearcherResultsWithChart";
import Container from '../style/Common/Container';
import Row from '../style/Common/Row';
import SeriesHero from '../style/Hero/SeriesHero';
import Tag from '../style/Tag/Tag';
import SeriesFilters from './filters/SeriesFilters';


interface ISearchPageProps extends RouteComponentProps<any> {
    seriesApi: ISerieApi;
    dispatch?: any;
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
        const searchParams: ISearchParams | undefined = this.getUriSearchParams(location);

        if (searchParams) {
            this.props.dispatch(setSearchParams(searchParams));
        }
    }

    public componentWillUnmount() {
        this.unListen();
    }

    public getUriSearchParams(location: Location): ISearchParams | undefined {
        const search: string = location.search; // could be '?foo=bar'
        const params: URLSearchParams = URLSearchParams(search);
        const q: string | undefined = params.get('q') || undefined;
        const offsetString: string | null = params.get('offset');
        const limitString: string | null = params.get('limit');
        const offset = offsetString ? parseInt(offsetString, 10) : initialState.searchParams.offset;
        const limit: number = limitString ? parseInt(limitString, 10) : initialState.searchParams.limit;
        const datasetSource = params.get('dataset_source') || "";
        const datasetTheme = params.get('dataset_theme') || "";
        const publisher = params.get('dataset_publisher_name') || "";
        const units = params.get('units') || "";
        const catalogId = params.get('catalog_id') || "";

        return ({
            catalogId,
            datasetSource,
            datasetTheme,
            limit,
            offset,
            publisher,
            q,
            units,
        });
    }

    public updateUriParams(q: string | null, datasetSource: string, datasetTheme: string, publisher: string, units: string, catalogId: string, offset: number, limit: number) {
        const urlSearchParams = URLSearchParams();

        urlSearchParams.setOrDelete('q', q);
        urlSearchParams.setOrDelete('dataset_source', datasetSource);
        urlSearchParams.setOrDelete('offset', offset.toString());
        urlSearchParams.setOrDelete('limit', limit.toString());
        urlSearchParams.setOrDelete('dataset_theme', datasetTheme);
        urlSearchParams.setOrDelete('dataset_publisher_name', publisher);
        urlSearchParams.setOrDelete('units', units);
        urlSearchParams.setOrDelete('catalog_id', catalogId);

        this.props.history.push('/search/?' + urlSearchParams);
    }

    public sourceRemoved(event: React.MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation();

        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, "", oldSearchParams.datasetTheme, oldSearchParams.publisher, oldSearchParams.units, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public sourcePicked(newDatasetSource: string): void {
        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, newDatasetSource, oldSearchParams.datasetTheme, oldSearchParams.publisher, oldSearchParams.units, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public themeRemoved(event: React.MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation();

        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, oldSearchParams.datasetSource, "", oldSearchParams.publisher, oldSearchParams.units, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public themePicked(newTheme: string): void {
        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location)

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, oldSearchParams.datasetSource, newTheme, oldSearchParams.publisher, oldSearchParams.units, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public publisherPicked(newPublisher: string): void {
        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location)

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, oldSearchParams.datasetSource, oldSearchParams.datasetTheme, newPublisher, oldSearchParams.units, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public publisherRemoved(event: React.MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation();

        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, oldSearchParams.datasetSource, oldSearchParams.datasetTheme, "", oldSearchParams.units, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public unitsPicked(newUnits: string): void {
        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location)

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, oldSearchParams.datasetSource, oldSearchParams.datasetTheme, oldSearchParams.publisher, newUnits, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public unitsRemoved(event: React.MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation();

        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, oldSearchParams.datasetSource, oldSearchParams.datasetTheme, oldSearchParams.publisher, "", oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public catalogPicked(newCatalog: string): void {
        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location)

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, oldSearchParams.datasetSource, oldSearchParams.datasetTheme, oldSearchParams.publisher, oldSearchParams.units, newCatalog, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public catalogRemoved(event: React.MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation();

        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

        if (oldSearchParams) {
            this.updateUriParams(oldSearchParams.q || null, oldSearchParams.datasetSource, oldSearchParams.datasetTheme, oldSearchParams.publisher, oldSearchParams.units, "", oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public searchTermPicked(newSearchTerm: string): void {
        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

        if (oldSearchParams) {
            this.updateUriParams(newSearchTerm, oldSearchParams.datasetSource, oldSearchParams.datasetTheme, oldSearchParams.publisher, oldSearchParams.units, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public searchTagPicked(event: React.MouseEvent<HTMLButtonElement>): void {
        const oldSearchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

        if (oldSearchParams) {
            this.updateUriParams("", oldSearchParams.datasetSource, oldSearchParams.datasetTheme, oldSearchParams.publisher, oldSearchParams.units, oldSearchParams.catalogId, oldSearchParams.offset, oldSearchParams.limit);
        }
    }

    public searchTags(): JSX.Element[] {
        let tags: JSX.Element[] = [];
        const searchParams: ISearchParams | undefined = this.getUriSearchParams(this.props.location);

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
                <div id="listado-list">
                    <Container>
                        <Row>
                            <div className="col-sm-4">
                                <SeriesFilters onSourcePicked={this.sourcePicked}
                                                onThemePicked={this.themePicked}
                                                onPublisherPicked={this.publisherPicked}
                                                onUnitsPicked={this.unitsPicked}
                                                onCatalogPicked={this.catalogPicked} />
                            </div>
                            <div className="col-sm-8">
                                <div id="list" className="pd-v-lg">
                                    <div className="title-and-tags">
                                        <h2 className="title title-md font-2">Resultados de la búsqueda:</h2>
                                        {this.searchTags()}
                                    </div>

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
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </section>
        );
    }

    private renderSearchResults(searchResults: SearchResult[]) {
        return <SearcherResultsWithChart searchResults={searchResults} seriesApi={this.props.seriesApi} />
    }
}


function mapStateToProps(state: IStore, ownProps: ISearchPageProps) {
    return {
        ...state.searchParams,
        seriesApi: state.seriesApi,
    };
}

export default withRouter<ISearchPageProps>(connect(mapStateToProps)(SearchPage));
