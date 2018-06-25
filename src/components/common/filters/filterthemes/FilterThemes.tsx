import * as React from "react";
import { connect } from "react-redux";

import { IStore } from "../../../../store/initialState";
import IFilterProps from "../FilterProps";


interface IFilterThemesProps extends IFilterProps {

    onThemePicked: (theme: string) => void;
}

interface IFilterThemesState {

    themes: string[];
}

export class FilterThemes extends React.Component<IFilterThemesProps, IFilterThemesState> {

    constructor(props: IFilterThemesProps) {
        super(props);

        this.state = { themes: [] };

        this.updateThemes = this.updateThemes.bind(this);
    }

    public componentDidMount(){
        this.updateThemes();
    }

    public updateThemes() {
        this.props.seriesApi.fetchThemes().then((themes: string[]) => {
            this.setState({ themes });
        });
    }

    public render() {
        const Selector = this.props.selector;
        return (
                <Selector
                    selected={this.props.picked}
                    items={this.state.themes}
                    onChange={this.props.onThemePicked}
                    renderItem={renderTheme}
                />
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