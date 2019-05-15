import * as React from 'react';
import FormHorizontal from "../Common/FormHorizontal";

interface IOptionsContainerProps extends React.Props<any> {
    labelText: string;
    className?: string;
}

export default (props: IOptionsContainerProps) => {
    const auxProps = Object.assign({}, props);
    const labelText = props.labelText;
    delete auxProps.labelText;
    delete auxProps.className;

    return (
        <div className={`g-complement col-xs-4 ${props.className}`}>
            <FormHorizontal>
                <label>{labelText}</label>
                <span {...auxProps} />
            </FormHorizontal>
        </div>
    )
}
