import * as React from 'react';
import FormHorizontal from "../Common/FormHorizontal";

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) =>
    <div className="col-xs-6 inline">
        <FormHorizontal {...props} />
    </div>