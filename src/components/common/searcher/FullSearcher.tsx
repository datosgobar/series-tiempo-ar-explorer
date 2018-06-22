import * as React from "react";

import Row from "../../style/Common/Row";

import { ISearchResultItem, ISerieApi } from "../../../api/SerieApi";
import SearchBox from "../../common/searchbox/SearchBox";
import { FilterSources } from "../filters/filtersources/FilterSources";
import { FilterThemes } from "../filters/filterthemes/FilterThemes";
import DropDownSelector from "../selector/DropDownSelector";
import Searcher, { ISearcherProps, ISearchParams } from "./Searcher";


interface IFullSearcherProps extends ISearchParams {

    seriesApi: ISerieApi;

    renderSearchResults: (searchResults: ISearchResultItem[]) => JSX.Element | JSX.Element[];
}

export default class FullSearcher extends React.Component<IFullSearcherProps, ISearchParams> {

    constructor(props: IFullSearcherProps) {
        super(props);

        this.state = {
            datasetSource: this.props.datasetSource,
            datasetTheme: this.props.datasetTheme,
            limit: this.props.limit,
            offset: this.props.offset,
            q: this.props.q,
        }

        this.onSearchTermPicked = this.onSearchTermPicked.bind(this);
        this.onSourcePicked = this.onSourcePicked.bind(this);
        this.onThemePicked = this.onThemePicked.bind(this);
    }

    public searcherProps(): ISearcherProps {
        return ({
            ...this.state,
            renderSearchResults: this.props.renderSearchResults,
            seriesApi: this.props.seriesApi,
        });
    }

    public onSearchTermPicked(q: string){
        this.setState({q});
    }

    public onSourcePicked(datasetSource: string): void{
        this.setState({datasetSource});
    }

    public onThemePicked(datasetTheme: string): void {
        this.setState({datasetTheme});
    }

    public render() {
        return (
            <div className="Searcher">

                <SearchBox seriesApi={this.props.seriesApi} searchTerm={this.props.q} onSearch={this.onSearchTermPicked} />
                            <div className="dp-filters">
                                <form>
                                    <div className="form-group">
                                        <Row>
                                            <div className="col-xs-4">
                                                <label className="label-control mg-sm-t">Tema:</label>
                                            </div>
                                            <div className="col-xs-8">
                                            <FilterThemes 
                                            onThemePicked={this.onThemePicked} 
                                            seriesApi={this.props.seriesApi} 
                                            picked={this.state.datasetTheme} 
                                            selector={DropDownSelector}/>
                                            </div>
                                        </Row>
                                    </div>
                                    <div className="form-group">
                                        <Row>
                                            <div className="col-xs-4">
                                                <label className="label-control mg-sm-t">Fuente:</label>
                                            </div>
                                            <div className="col-xs-8">
                                            <FilterSources 
                                            onSourcePicked={this.onSourcePicked} 
                                            seriesApi={this.props.seriesApi} 
                                            picked={this.state.datasetSource} 
                                            selector={DropDownSelector}/>
                                            </div>
                                        </Row>
                                    </div>
                                    <div className="form-group">
                                        <Row>
                                            <div className="col-xs-4">
                                                <label className="label-control">Periodicidad de al menos:</label>
                                            </div>
                                            <div className="col-xs-8">
                                                <select className="form-control">
                                                    <option value="">Selecciona una opción</option>
                                                </select>
                                            </div>
                                        </Row>
                                    </div>
                                    <h5 className="title-xxsm font-1 mg-b">Último dato disponible:</h5>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <label className="label-control mg-sm-t">Desde:</label>
                                                    </div>
                                                    <div className="col-xs-9">
                                                        <select className="form-control">
                                                            <option value="">Cualquiera</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <label className="label-control mg-sm-t">Hasta:</label>
                                                    </div>
                                                    <div className="col-xs-9">
                                                        <select className="form-control">
                                                            <option value="">Cualquiera</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="title-xxsm font-1 mg-b">43 series encontradas (Hacé clic sobre las que quieras agregar)</h6>
                                </form>
                            </div>
                                <Searcher {...this.searcherProps()}/>
                            
                            <div className="dp-no-results pd-v-xlg">
                                <h3 className="title-lg font-1 text-center color-gl mg-xlg-t mg-xlg-b">Los resultados aparecerán aquí</h3>
                            </div>
            </div>
        );
    }
}
