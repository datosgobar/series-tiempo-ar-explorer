import * as React from 'react';

import FormGroup from '../Common/FormGroup';

export default (props: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) =>

    <form id="form-hero-search" {...props}>
        <FormGroup>
            { props.children }
        </FormGroup>
    </form>

