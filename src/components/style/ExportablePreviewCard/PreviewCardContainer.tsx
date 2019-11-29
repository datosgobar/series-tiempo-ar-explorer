import * as React from 'react';


export interface IPreviewCardContainerProps extends React.HTMLProps<HTMLDivElement> {
    clickTarget: string;
}

export default class PreviewCardContainer extends React.Component<IPreviewCardContainerProps> {
  
    constructor(props: IPreviewCardContainerProps) {

        super(props);
        this.clickHandling = this.clickHandling.bind(this);

    }

    public render() {
        return (
            <div className="p-container" onClick={this.clickHandling}>
                {this.props.children}
            </div>
        );
    }

    public clickHandling() {
        window.open(this.props.clickTarget, '_blank');
    }

}
