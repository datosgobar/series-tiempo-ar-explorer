import * as React from 'react';

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) =>

    <li data-tip="Click me to show the tooltip"  data-event='click focus'><a className="pointer" {...props} /></li>
