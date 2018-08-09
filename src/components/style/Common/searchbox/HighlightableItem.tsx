import * as React from 'react';

interface IHighlightableItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    isHighlighted: boolean;
}

export default (props: IHighlightableItemProps) => {
    const allProps = { ...props };
    delete allProps.isHighlighted;

    return (
        <div className={props.isHighlighted ? 'highlight-item' : ''}>
            <span className="pointer" {...allProps} />
        </div>
    )

}
