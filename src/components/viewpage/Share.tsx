import * as React from "react";

interface IShareProps {
    url: string
}

export class Share extends React.Component<IShareProps, any> {

    constructor(props: IShareProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <div className="share-container">
                    <i className="fa fa-link" />
                    <span>Enlace para compartir: <a href={this.props.url}>{this.props.url}</a></span>
                </div>
                <span>Guarda este link para automatizar la búsqueda</span>
            </div>
        )
    }
}
