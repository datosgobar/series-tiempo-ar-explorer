import * as React from "react";
import { connect } from "react-redux";

import { ISerieApi } from "../../../../api/SerieApi";
import { IStore } from "../../../../store/initialState";

interface IFilterThemesProps {

    seriesApi: ISerieApi;
    onThemePicked: (event: React.SyntheticEvent<HTMLElement>, source: string) => void;
    picked: string;
}

interface IFilterThemesState {

    themes: string[];
}

export class FilterThemes extends React.Component<IFilterThemesProps, IFilterThemesState> {

    constructor(props: IFilterThemesProps) {
        super(props);

        this.state = { themes: [] };

        this.handleClick = this.handleClick.bind(this);
        this.toCheckBox = this.toCheckBox.bind(this);
    }

    public updateThemes() {
        this.props.seriesApi.fetchThemes().then(themes => {
            this.setState({ themes });
        });
    }

    public componentDidMount() {
        this.updateThemes()
    }

    public handleClick(source: string) {
        return (event: React.SyntheticEvent<HTMLElement>) => {
            this.props.onThemePicked(event, source);
        };
    }

    public render() {
        return (
            <div>
                <h3>Themes</h3>
                <div>
                    {this.state.themes.map(this.toCheckBox)}
                </div>
            </div>
        );
    }

    public toCheckBox(source: string) {
        return (
            <div className="Theme" key={source}>
                <label>
                    <input type="radio" value={source} checked={this.props.picked === source} onChange={this.handleClick(source)} />
                    {source}
                </label>
            </div>);
    }
}

function mapStateToProps(state: IStore) {
    return {
        picked: state.searchParams.datasetTheme,
    };
}

export default connect(mapStateToProps)(FilterThemes);