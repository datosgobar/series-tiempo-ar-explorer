import * as React from "react";

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) =>
    <div className="share row">
        <div className="inline graph mg-xlg-b col-xs-5">
            <div className="share" {...props} />
        </div>
    </div>
