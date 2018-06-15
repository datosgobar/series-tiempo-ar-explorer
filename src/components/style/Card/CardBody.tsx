import * as React from 'react';

export default (props: React.Props<any>) =>

    <div className="card-desc">
        <p>
            {props.children}
        </p>
    </div>