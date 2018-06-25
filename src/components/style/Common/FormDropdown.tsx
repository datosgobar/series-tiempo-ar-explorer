import * as React from 'react';

import DropDownIcon from './DropDownIcon';
import FormInput from './FormInput';


type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default class FormDropdown extends React.Component<Props> {

    public render() {
        return (
            <div>
                <FormInput {...this.props} />
                <DropDownIcon />
            </div>
        );
    }

}