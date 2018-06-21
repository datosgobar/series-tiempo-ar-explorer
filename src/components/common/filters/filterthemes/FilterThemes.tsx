import * as React from "react";
import { connect } from "react-redux";

import { IStore } from "../../../../store/initialState";
import IFilterProps from "../FilterProps";


interface IFilterThemesProps extends IFilterProps {

    onThemePicked: (event: React.SyntheticEvent<HTMLElement>, source: string) => void;
}

interface IFilterThemesState {

    themes: string[];
}

export class FilterThemes extends React.Component<IFilterThemesProps, IFilterThemesState> {

    constructor(props: IFilterThemesProps) {
        super(props);

        this.state = { themes: [] };

        this.updateThemes = this.updateThemes.bind(this);
        this.onItemSelected = this.onItemSelected.bind(this);
    }

    public componentDidMount(){
        this.updateThemes();
    }

    public updateThemes() {
        this.props.seriesApi.fetchThemes().then((themes: string[]) => {
            this.setState({ themes });
        });
    }

    public onItemSelected(event: React.SyntheticEvent<HTMLElement>, item: string) {
        this.props.onThemePicked(event, item);
    }

    public render() {
        const LabelWrapper = this.props.labelWraper
        const Selector = this.props.selector;
        return (
            <div>
                <LabelWrapper>Categorías:</LabelWrapper>
                <Selector
                    selected={this.props.picked}
                    items={this.state.themes}
                    onItemSelected={this.onItemSelected}
                    renderItem={renderTheme}
                />
            </div>
        );
    }
}

function renderTheme(theme: string) {
    return theme;
}

function mapStateToProps(state: IStore) {
    return {
        picked: state.searchParams.datasetTheme,
    };
}

export default connect(mapStateToProps)(FilterThemes);