import * as React from 'react';
import FormHorizontal from "../Common/FormHorizontal";

interface IFrequencyContainerProps {
    labelText: string;
}

export default (props: IFrequencyContainerProps) => {
    const auxProps = Object.assign({}, props);
    const labelText = props.labelText;
    delete auxProps.labelText;

    return (
        <div className="col-xs-4" style={{float: 'right'}}>
            <FormHorizontal>
                <label className="col-sm-4 control-label">{labelText}</label>
                <div className="col-sm-6" {...auxProps} />
            </FormHorizontal>
        </div>
    )
}
