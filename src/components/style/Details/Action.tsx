import * as React from 'react';

export default (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) =>

    <button className="btn btn-link action" {...props} />