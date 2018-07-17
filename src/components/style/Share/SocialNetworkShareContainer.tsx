import * as React from "react";

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) =>
    <span>
        <span className="caption">Compartir en</span>
        <ul className="social" {...props}/>
    </span>
