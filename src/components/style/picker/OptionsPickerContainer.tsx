import * as React from 'react';
import FormHorizontal from "../Common/FormHorizontal";
import { IPickerStyle } from '../../common/picker/OptionsPicker';

interface IOptionsContainerProps extends React.Props<any> {
    labelText: string;
    className?: string;
    style?: IPickerStyle;
}

export default (props: IOptionsContainerProps) => {
    const auxProps = Object.assign({}, props);
    const labelText = props.labelText;
    delete auxProps.labelText;
    delete auxProps.className;

    return (
        <div className={`g-complement col-xs-4 ${props.className}`} style={props.style}>
            <FormHorizontal>
                <label>{labelText}</label>
                <span {...auxProps} />
            </FormHorizontal>
        </div>
    )
}
