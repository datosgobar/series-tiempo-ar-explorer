import * as React from 'react';

interface IHighlightableItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    isHighlighted: boolean;
}

export default (props: IHighlightableItemProps) => {
    const allProps = { ...props };
    delete allProps.isHighlighted;

    return (
        <div ref={(node) => { // necessary to highlight the selected option
            if (node) {
                node.style.setProperty("background-color", `${props.isHighlighted ? 'lightgray' : 'white'}`, "important");
            }}}>
            <span className="pointer" {...allProps} />
        </div>
    )

}
