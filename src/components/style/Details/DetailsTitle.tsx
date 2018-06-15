import * as React from 'react';


export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) =>

    <h2 className="title title-md font-2" style={{color: props.color}} {...props} />