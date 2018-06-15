import * as React from 'react';

export default (props: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) =>

    <form id="form-hero-search" {...props}>
        <div className="form-group">
            { props.children }
        </div>
    </form>

