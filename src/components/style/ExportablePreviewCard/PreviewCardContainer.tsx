import * as React from 'react';


export interface IPreviewCardContainerProps extends React.HTMLProps<HTMLDivElement> {
    clickTarget: string;
    width: string;
}

interface IPreviewCardContainerStyle {
    width: string;
}

export default class PreviewCardContainer extends React.Component<IPreviewCardContainerProps> {
  
    constructor(props: IPreviewCardContainerProps) {

        super(props);
        this.clickHandling = this.clickHandling.bind(this);

    }

    public render() {

        const containerStyle: IPreviewCardContainerStyle = {
            width: this.props.width
        }

        return (
            <div className="p-container" onClick={this.clickHandling} style={containerStyle}>
                {this.props.children}
            </div>
        );

    }

    public clickHandling() {
        window.open(this.props.clickTarget, '_blank');
    }

}
