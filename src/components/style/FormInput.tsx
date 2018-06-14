import * as React from 'react';

export default (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) =>

    <input
        className="form-control"
        {...props} />
