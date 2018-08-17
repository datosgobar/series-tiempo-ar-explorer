import * as React from 'react';

export default (props: React.Props<any>) =>

    <div className="card-desc v-clamp-2">
        <p>
            {props.children}
        </p>
    </div>