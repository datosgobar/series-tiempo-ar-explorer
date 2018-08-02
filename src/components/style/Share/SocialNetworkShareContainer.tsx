import * as React from "react";

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) =>
    <span>
        <ul className="social" {...props}/>
    </span>
