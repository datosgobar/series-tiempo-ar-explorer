import * as React from 'react';
import FormHorizontal from "../Common/FormHorizontal";

interface IFrequencyContainerProps {
    labelText: string;
    className: string;
}

export default (props: IFrequencyContainerProps) => {
    const auxProps = Object.assign({}, props);
    const labelText = props.labelText;
    delete auxProps.labelText;
    delete auxProps.className;

    return (
        <div className={props.className}>
            <FormHorizontal>
                <label className="col-sm-6 control-label">{labelText}</label>
                <div className="col-sm-6" {...auxProps} />
            </FormHorizontal>
        </div>
    )
}
