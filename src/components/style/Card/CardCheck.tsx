import * as React from 'react';
import {connect} from "react-redux";


class CardCheck extends React.Component<any, any> {

    public constructor(props: any) {
        super(props);
        this.onHover = this.onHover.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.handleRemoveSerie = this.handleRemoveSerie.bind(this);

        this.state = {
            hover: false
        }
    }

    public onHover() {
        if (this.props.serieTags.length > 1) {
            this.setState({hover: true})
        }
    }

    public onLeave() {
        this.setState({hover: false})
    }

    public handleRemoveSerie(event: any) {
        event.stopPropagation();
        if (this.state.hover && this.props.serieTags.length > 1) {
            this.props.onRemoveSerie();
        }
    }

    public render() {
        return (
            <span className="card-check" onMouseOver={this.onHover} onMouseOut={this.onLeave}>
                <i className={this.state.hover ? "fas fa-times-circle bg-gray" : "fas fa-check-circle"} onClick={this.handleRemoveSerie}/>
            </span>
        )
    }

}

function mapStateToProps(state: any, ownProps: any) {
    return {
        serieTags: state.serieTags,
    };
}

export default connect(mapStateToProps)(CardCheck);
