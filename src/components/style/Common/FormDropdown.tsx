import * as React from 'react';

import DropDownIcon from './DropDownIcon';
import FormInput from './FormInput';

export default (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) =>

<div>
    <FormInput {...props} />
    <DropDownIcon />
        </div>