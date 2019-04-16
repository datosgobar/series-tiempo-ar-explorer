import * as React from 'react';

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) =>
    <div className="col-sm-4">
        <div id="filters" className="bg bg-gl pd-full-lg" {...props} />
    </div>