import * as React from "react";
import { connect } from "react-redux";
import { IAggregationValue } from "../../../../api/ITSAPIResponse";
import { ISerieApi } from "../../../../api/SerieApi";
import { same } from "../../../../helpers/commonFunctions";
import { IStore } from "../../../../store/initialState";


export interface IFilterProps extends React.Props<{}> {
    seriesApi: ISerieApi;
    picked: string;
    selector: any;
}

interface IFilterThemesProps extends IFilterProps {
    onThemePicked: (theme: string) => void;
    themes: IAggregationValue[];
}

export class FilterThemes extends React.Component<IFilterThemesProps, any> {

    constructor(props: IFilterThemesProps) {
        super(props);
    }

    public render() {
        const Selector = this.props.selector;
        return (
                <Selector
                    selected={this.props.picked}
                    items={this.props.themes.map((e:any)=>e.label)}
                    onChange={this.props.onThemePicked}
                    renderItem={same}
                />
        );
    }
}


function mapStateToProps(state: IStore) {
    return {
        picked: state.searchParams.datasetTheme,
        themes: state.aggregations.dataset_theme,
    };
}

export default connect(mapStateToProps)(FilterThemes);