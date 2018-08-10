import * as React from "react";

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) =>
    <div className="col-xs-3">
        <div className="share" {...props} />
    </div>
