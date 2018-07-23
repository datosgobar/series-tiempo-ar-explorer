import * as React from "react";

import {ISerieApi} from "../../../api/SerieApi";
import FormGroup from "../../style/Common/FormGroup";
import Row from "../../style/Common/Row";
import { FilterSources } from "../filters/filtersources/FilterSources";
import { FilterThemes } from "../filters/filterthemes/FilterThemes";
import DropDownSelector from "../selector/DropDownSelector";
import {ISearchParams} from "./Searcher";

export interface ISearchFilters {
    onThemePicked: (datasetTheme: string) => void;
    seriesApi: ISerieApi;
    pickedTheme: string;
    selector: any;
    onSourcePicked: (datasetSource: string) => void;
    pickedSource: string;
}

export default class SearchFilters extends React.Component<ISearchFilters, ISearchParams> {

    public render() {
        return (
            <div className="dp-filters">
                <form>
                    <FormGroup>
                        <Row>
                            <div className="col-xs-4">
                                <label className="label-control mg-sm-t">Tema:</label>
                            </div>
                            <div className="col-xs-8">
                                <FilterThemes
                                    onThemePicked={this.props.onThemePicked}
                                    seriesApi={this.props.seriesApi}
                                    picked={this.props.pickedTheme}
                                    selector={DropDownSelector}/>
                            </div>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <div className="col-xs-4">
                                <label className="label-control mg-sm-t">Fuente:</label>
                            </div>
                            <div className="col-xs-8">
                                <FilterSources
                                    onSourcePicked={this.props.onSourcePicked}
                                    seriesApi={this.props.seriesApi}
                                    picked={this.props.pickedSource}
                                    selector={DropDownSelector} />
                            </div>
                        </Row>
                    </FormGroup>
                </form>
            </div>
        )
    }
}