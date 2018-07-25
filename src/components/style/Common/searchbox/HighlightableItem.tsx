import * as React from 'react';

interface IHighlightableItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
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
            <a href="#" {...allProps}/>
        </div>
    )

}
