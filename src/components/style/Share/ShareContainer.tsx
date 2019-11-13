import * as React from "react";

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) =>
    <div className="share col-xs-12 col-md-3">
        <div {...props} />
    </div>
