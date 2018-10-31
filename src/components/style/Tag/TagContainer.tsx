import * as React from 'react';


export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) =>

    <div className="tags">
        <div className="col-xs-8 col-sm-10" {...props} />
    </div>