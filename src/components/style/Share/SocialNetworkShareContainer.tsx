import * as React from "react";

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) =>
    <span className="g-social-container">
        <ul className="social" {...props}/>
    </span>
