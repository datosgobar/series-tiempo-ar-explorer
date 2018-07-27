import * as React from 'react';
import FormGroup from "./FormGroup";

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) =>

    <div className="form-horizontal">
        <FormGroup {...props} />
    </div>
